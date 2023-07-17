import React, {useState} from 'react';
import {View, Text, Pressable, TextInput, FlatList} from 'react-native';
import {SimpleDownArrow, VerticalBlackDot} from '../../../assets';
import ContactInfoStyle from '../ContactInfo.style';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import {C} from '../../../constants';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import moment from 'moment';
import {navigate} from '../../../navigation/useNavigationUtils';
import {routeEnum} from '../../../enums/route.enum';

interface fileInterface {
  candidateId: string;
  createdAt: Date | string;
  fileLocationUrl: string;
  fileName: string;
  fileType: string;
  id: string | null;
  status: string;
  updatedAt: Date | string;
}
interface MediaSectionInterface {
  name: string;
  files: fileInterface;
}
const MediaSection = (props: MediaSectionInterface) => {
  const {styles} = useThemedStyles(ContactInfoStyle);
  const [textArea, setTextArea] = useState(true);
  const [text, setText] = useState('');
  const [isTrigerred, setIsTrigerred] = useState(false);
  const dgl = C.measures.dgl;

  const renderNotes = ({item, index}) => {
    return (
      <View style={styles.notesMainView}>
        <View>
          <Text style={{color: '#000', fontSize: dgl * 0.017}}>
            {item?.note}
          </Text>
          <Text>{moment(item?.createdAt).format('DD MMMM YYYY, h:mm a')}</Text>
        </View>
        <Menu
          onBackdropPress={() => {
            setIsTrigerred(false);
          }}
          opened={isTrigerred}>
          <MenuTrigger
            onPress={() => {
              setIsTrigerred(true);
            }}>
            <VerticalBlackDot
              onPress={() => {
                setIsTrigerred(!isTrigerred);
              }}
              width={30}
              height={12}
              backgroundColor={'red'}
              color={'red'}
            />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{borderRadius: 3}}>
            <MenuOption style={{}}>
              {/* <Pressable
                onPress={() => {
                  console.log('edit');
                }}>
                <Text>Edit</Text>
              </Pressable> */}
              <Pressable
                onPress={() => {
                  console.log('edit');
                }}>
                <Text>delete</Text>
              </Pressable>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  };
  return (
    <View style={styles.noteSectionView}>
      {/* <Pressable
        onPress={() => {
          navigate(routeEnum.MEDIALISTSCREEN, {
            files: props.files,
            name: props.name,
          });
        }}>
        <Text style={styles.mediaText}>Media and Documents</Text>
      </Pressable>
      <View
        style={{
          width: '100%',
          borderBottomColor: '#E1E4E8',
          borderBottomWidth: 1,
          alignSelf: 'center',
          marginVertical: 12,
          marginLeft: 5
        }}
      /> */}
      {/* <Pressable
        onPress={() => {
          setTextArea(!textArea);
        }}
        style={styles.noteSection}>
        <Text style={styles.mediaText}>Notes</Text>
        <SimpleDownArrow />
      </Pressable> */}
      {/* {textArea && (
        <View>
          <View>
            <TextInput
              placeholder="new note is bieng added here"
              value={text}
              onChangeText={setText}
              multiline
              style={{
                borderRadius: 10,
                borderColor: '#ededed',
                borderWidth: 1,
                padding: 5,
                maxHeight: 100,
              }}
            />
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: dgl * 0.015,
                  marginHorizontal: 5,
                }}>
                Cancel
              </Text>
              <Text style={{}}>Save</Text>
            </View>
          </View>
          <FlatList data={props?.candidate_notes} renderItem={renderNotes} />
        </View>
      )} */}
    </View>
  );
};

export default MediaSection;
