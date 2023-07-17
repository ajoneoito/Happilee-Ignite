import NoteSectionStyles from './Notes.style';
import {TouchableOpacity} from 'react-native';
import measures from '../../constants/measures';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_NEW_NOTE,
  DELETE_NOTE,
} from '../../redux/actions/candidateDetails.action';
import {Add, DeleteIcon, LeftArrow} from '../../assets';
import {RootState} from '../../redux/store/root.reducer';
import {goBack} from '../../navigation/useNavigationUtils';
import {Notes} from '../../interface/ContactInfoInterface';
import {FlatList, Pressable, Text, View} from 'react-native';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import ModalStructure from '../../components/Modal/Modal.component';
import InputField from '../../components/InputField/InputField.component';

const NoteSection = () => {
  const dispatch = useDispatch();
  const [noteText, setNoteText] = useState('');
  const {id} = useRoute().params as {id: string};
  const {styles} = useThemedStyles(NoteSectionStyles);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const candidateDetails = useSelector(
    (state: RootState) => state.candidateDetails,
  );
  const [notes, setNotes] = useState(candidateDetails.candidate_notes);
  const AudioState = useSelector((state: RootState) => state.closeAudioPLayer);

  useEffect(() => {
    setNotes(candidateDetails.candidate_notes);
  }, [candidateDetails.candidate_notes]);

  const onPressAddNewNote = () => {
    dispatch({
      type: ADD_NEW_NOTE,
      payload: {
        data: {candidate_id: id, note: noteText},
        candidateId: {candidateId: Number.parseInt(id, 10)},
      },
    });
    setNoteText('');
    setIsVisibleModal(false);
  };
  const DeleteNote = (NoteId: string | undefined) => {
    dispatch({
      type: DELETE_NOTE,
      payload: {
        data: {note_id: NoteId},
        candidateId: {candidateId: Number.parseInt(id, 10)},
      },
    });
  };
  const renderNotes = ({item}: {item: Notes}) => {
    return (
      <View style={styles.renderNotesMainView}>
        <View style={styles.textInputView}>
          <Text style={styles.inputText}>{item?.note}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            DeleteNote(item?.id);
          }}
          style={styles.deleteBtn}
          hitSlop={{top: 10, left: 20, bottom: 10, right: 10}}>
          <DeleteIcon
            onPress={() => {
              DeleteNote(item?.id);
            }}
            width={measures.dgl * 0.03}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const onBackgroundPress = () => {
    setIsVisibleModal(false);
  };
  const handleIsModalInvisible = () => {
    setIsVisibleModal(false);
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerMainView,
          AudioState?.isAudioPlaying === null ? undefined : styles.headerTop,
        ]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => {
              goBack();
            }}
            hitSlop={{top: 10, left: 20, bottom: 10, right: 10}}>
            <LeftArrow
              onPress={() => {
                goBack();
              }}
              width={measures.dgl * 0.03}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Notes</Text>
        </View>
      </View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={notes}
          renderItem={renderNotes}
        />
      </View>
      <Pressable
        onPress={() => {
          setIsVisibleModal(true);
        }}
        style={styles.addBtn}>
        <Add />
        <Text style={styles.addNewText}>ADD NEW</Text>
      </Pressable>
      <ModalStructure
        onBackgroundPress={onBackgroundPress}
        onBackground_Press={onBackgroundPress}
        handleIsModalInvisible={handleIsModalInvisible}
        isVisible={isVisibleModal}
        modalHeaderText={'Add new parameter'}>
        <View style={styles.inputSectionView}>
          <InputField
            placeholder={'Enter note'}
            headerText={'Note'}
            value={noteText}
            onChangeText={(text: string) => {
              setNoteText(text);
            }}
          />
          <Pressable
            onPress={onPressAddNewNote}
            style={styles.addBtnInsideModal}>
            <Text style={styles.addBtnTextInsideModal}>ADD</Text>
          </Pressable>
        </View>
      </ModalStructure>
    </View>
  );
};

export default NoteSection;
