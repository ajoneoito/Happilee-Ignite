import {View} from 'react-native';
import {FlatList} from 'react-native';
import {Pressable, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import measures from '../../constants/measures';
import React, {useState, useEffect} from 'react';
import ParameterStyles from './Parameters.styles';
import {useRoute} from '@react-navigation/native';
import {
  ADD_NEW_PARAMETER,
  DELETE_PARAMETER,
} from '../../redux/actions/candidateDetails.action';
import {useDispatch, useSelector} from 'react-redux';
import {Add, DeleteIcon, LeftArrow} from '../../assets';
import {RootState} from '../../redux/store/root.reducer';
import {goBack} from '../../navigation/useNavigationUtils';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import ModalStructure from '../../components/Modal/Modal.component';
import InputField from '../../components/InputField/InputField.component';
import {Newparameters, Parameters} from '../../interface/ContactInfoInterface';

const ParameterScreen = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [labelText, setLabelText] = useState('');
  const candidateDetails = useSelector(
    (state: RootState) => state.candidateDetails,
  );
  const {id} = useRoute().params as {id: string};
  const {styles} = useThemedStyles(ParameterStyles);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const AudioState = useSelector((state: RootState) => state.closeAudioPLayer);
  const [parameters, setParameters] = useState<Parameters[] | Newparameters[]>(
    candidateDetails.candidate_custom_parameters,
  );

  const DeleteParameter = (parameterId: string | undefined) => {
    dispatch({
      type: DELETE_PARAMETER,
      payload: {
        data: {parameterId: parameterId},
        candidateId: {candidateId: Number.parseInt(id, 10)},
      },
    });
  };

  useEffect(() => {
    setParameters(candidateDetails.candidate_custom_parameters);
  }, [candidateDetails]);

  const onPressAddNewParameter = () => {
    const Array = [...parameters];
    Array.push({
      candidateId: id,
      name: labelText,
      value: value,
    });
    dispatch({
      type: ADD_NEW_PARAMETER,
      payload: {
        data: {paramsArray: Array, candidateId: id},
        candidateId: {candidateId: Number.parseInt(id, 10)},
      },
    });
    setValue('');
    setLabelText('');
    setIsVisibleModal(false);
  };

  const RenderParameters = ({item}: {item: Parameters}) => {
    return (
      <View style={styles.paramView}>
        <Text style={styles.labelText}>{item.name}</Text>
        <View style={styles.textInputView}>
          <Text style={styles.inputText}>{item.value}</Text>
        </View>
        {item.name !== 'name' &&
          item.name !== 'phone' &&
          item.name !== 'position' &&
          item.name !== 'jobId' &&
          item.name !== 'service' &&
          item.name !== 'serviceId' && (
            <TouchableOpacity
              onPress={() => {
                DeleteParameter(item?.id);
              }}
              hitSlop={{top: 10, left: 20, bottom: 10, right: 10}}>
              <DeleteIcon
                onPress={() => {
                  DeleteParameter(item?.id);
                }}
                width={measures.dgl * 0.03}
              />
            </TouchableOpacity>
          )}
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
          <Text style={styles.headerText}>Parameters</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={parameters}
          renderItem={RenderParameters}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
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
            placeholder={'Enter Parameter'}
            headerText={'Parameter'}
            value={labelText}
            onChangeText={(text: string) => {
              setLabelText(text);
            }}
          />
          <View style={styles.margin} />
          <InputField
            placeholder={'Enter Value'}
            headerText={'Value'}
            value={value}
            onChangeText={(text: string) => {
              setValue(text);
            }}
          />
          <Pressable
            onPress={onPressAddNewParameter}
            style={styles.addBtnInsideModal}>
            <Text style={styles.addBtnTextInsideModal}>ADD</Text>
          </Pressable>
        </View>
      </ModalStructure>
    </View>
  );
};

export default ParameterScreen;
