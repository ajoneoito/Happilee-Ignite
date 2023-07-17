/**
 * Selectcontact.Screen.tsx
 * @module Selectcontact screen
 * @desc Screen for Select contact listing.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React, {useState, useEffect, useRef} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {SelectContactStyle} from './SelectContact.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {BlackPenIcon} from '../../assets';
import {AddContactIcon} from '../../assets';
import {C} from '../../constants';
import realm from '../../utils/database/schema';
import {getContacts} from '../../utils/database/realmHooks/useContacts';
import {getChatItemByCandidateId} from '../../utils/database/realmHooks/useChatList';
import Header from '../../components/Header/Header.componenet';
import useTheme from '../../utils/theming/useTheme';
import {routeEnum} from '../../enums/route.enum';
import {useDispatch, useSelector} from 'react-redux';
import {setContactListFilter} from '../../redux/slices/contactListFilter.slice';
import {
  FETCH_CONTACTS_ACTION,
  UPDATE_CONTACT_FILTER,
} from '../../redux/actions/contactList.action';
import {MenuProvider} from 'react-native-popup-menu';
import {API_LIMIT, REALM_LIMIT, REALM_OFFSET} from '../../constants/pagination';
import {
  GET_CHAT_HISTORY_ACTION,
  GET_GLOBAL_CHAT_HISTORY_ACTION,
} from '../../redux/actions/chathistory.action';
import {
  GLOBAL_TEMPLATE_LIST_ACTION,
  TEMPLATE_LIST_ACTION,
} from '../../redux/actions/templates.action';
import {ChatListInterface} from '../../utils/database/interfaces';
import {ContactInterface} from '../../utils/database/interfaces';
import {Toast, ALERT_TYPE} from '../../components/AlertComponent';
import {useTranslation} from 'react-i18next';
import {setTab} from '../../redux/slices/tab.slice';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';
import useStateRef from '../../hooks/useStateRef';
import {RootState} from '../../redux/store/root.reducer';
const dgl = C.measures.dgl;
const contactModal = realm.objects('Contacts');

const SelectContact = ({navigation}) => {
  const style = useThemedStyles(SelectContactStyle);
  const dispatch = useDispatch();
  const theme = useTheme();
  const mounted = useRef(false);
  const [contacts, setContacts, contactsRef] = useStateRef([]);
  const [title, setTitle] = useState('Select Contact');
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(REALM_OFFSET);
  const [limit, setLimit] = useState(REALM_LIMIT);
  const [paginated, setPaginated] = useState(false);
  const {contactListFilter, contactList} = useSelector(state => state);
  const auth = useSelector((state: RootState) => state.auth);
  const searchQuery = useDebouncedSearch(search, 500);
  const {t} = useTranslation();
  useEffect(() => {
    if (mounted?.current) {
      setOffset(REALM_OFFSET);
      contactsRef.current = [];
      setContacts([...contactsRef.current]);
      dispatch({type: FETCH_CONTACTS_ACTION, payload: contactListFilter});
      setContacts(
        getContacts(
          auth?.projectId,
          REALM_OFFSET,
          limit,
          search,
          contactListFilter?.tag_filter,
        ),
      );
    }
  }, [contactListFilter?.search, contactListFilter?.tag_filter]);

  useEffect(() => {
    if (mounted?.current) {
      dispatch({
        type: UPDATE_CONTACT_FILTER,
        payload: {pageNumber: 1, search: searchQuery},
      });
    }
  }, [searchQuery]);
  useEffect(() => {
    dispatch(setTab('Contacts')); //to be checked in header filter
    mounted.current = true;
    setContacts(
      getContacts(
        auth?.projectId,
        offset,
        limit,
        search,
        contactListFilter?.tag_filter,
      ),
    );
    dispatch({type: FETCH_CONTACTS_ACTION, payload: contactListFilter});
    setOffset(offset + limit);
    try {
      contactModal.addListener(onContactChanges);
    } catch (error) {
      console.error(
        `An exception was thrown within the change listener: ${error}`,
      );
    }
    return () => {
      realm.removeListener('change', onContactChanges);
      mounted.current = false;
      dispatch(setTab('chats')); //to be checked in header filter
    };
  }, []);

  const sortAndInsert = (item: ContactInterface) => {
    // Use binary search to find the index where the new object should be inserted
    let low = 0;
    let high = contactsRef.current.length - 1;
    let index = -1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (
        new Date(contactsRef.current[mid].created_at) <
        new Date(item.created_at)
      ) {
        high = mid - 1;
      } else {
        index = mid;
        low = mid + 1;
      }
    }

    // Insert the new object at the appropriate index
    if (index === -1) {
      contactsRef.current.unshift(item);
      setContacts([...contactsRef.current]);
    } else {
      contactsRef.current.splice(index, 0, item);
      setContacts([...contactsRef.current]);
    }
  };
  const loadMoredata = () => {
    if (contactListFilter?.hasNextPage) {
      dispatch({
        type: UPDATE_CONTACT_FILTER,
        payload: {pageNumber: contactListFilter.pageNumber + 1},
      });
      dispatch({type: FETCH_CONTACTS_ACTION, payload: contactListFilter});
    }
    if (!paginated) {
      let paginatedArray = getContacts(
        auth?.projectId,
        offset,
        offset + limit,
        search,
        contactListFilter?.tag_filter,
      );
      setOffset(offset + limit);
      paginatedArray?.map(contact => {
        let itemExists = contactsRef?.current.find(
          obj => obj.id === contact.id,
        );
        if (!itemExists) {
          sortAndInsert(contact);
        }
      });
      if (paginatedArray.length < limit) {
        setPaginated(true);
      }
    }
  };
  function onContactChanges(modal: any, changes: any) {
    // Handle newly added chat history objects
    changes.insertions.forEach((index: number) => {
      try {
        const insertedContact = JSON.parse(JSON.stringify(modal[index]));
        let itemExists = -1;
        if (contactsRef?.current && contactsRef?.current[0]) {
          itemExists = contactsRef?.current?.findIndex(
            obj => obj.id === insertedContact.id,
          );
        } else {
          contactsRef.current = [];
        }
        if (itemExists < 0 && insertedContact?.projectId === auth?.projectId) {
          //chatsRef.current = [insertedChat, ...chatsRef.current];
          //setChats([...chatsRef.current]);
          sortAndInsert(insertedContact);
        }
      } catch (e) {
        console.log('error in insertion', e);
      }
    });
    changes.deletions.forEach((index: number) => {
      // You cannot directly access deleted objects,
      // but you can update a UI list, etc. based on the index.
      // console.warn(`Looks like contact #${index} has left the realm.`);
    });
    // Handle chat history objects that were modified
    changes.modifications.forEach((index: number) => {
      try {
        const insertedContact = JSON.parse(JSON.stringify(modal[index])); //deep copy realm obj to avoid invalidated cached issue while deleting from db
        const itemExists = contactsRef.current.find(
          obj => obj.id === insertedContact.id,
        );
        if (!itemExists && insertedContact?.projectId === auth?.projectId) {
          //setChats(oldArry => [insertedChat, ...oldArry]);
          sortAndInsert(insertedContact);
        } else if (
          itemExists &&
          insertedContact.projectId === auth?.projectId
        ) {
          const fromIndex = contactsRef.current.findIndex(
            item => item.id === insertedContact.id,
          );
          if (
            moment(new Date(insertedContact.created_at)).isAfter(
              moment(new Date(chatsRef?.current?.[0]?.created_at)),
            )
          ) {
            contactsRef.current = [
              insertedContact,
              ...contactsRef.current.slice(0, fromIndex),
              ...contactsRef.current.slice(fromIndex + 1),
            ];
            setContacts([...contactsRef.current]);
          } else {
            contactsRef.current = [
              ...contactsRef.current.slice(0, fromIndex),
              insertedContact,
              ...contactsRef.current.slice(fromIndex + 1),
            ];
            setContacts([...contactsRef.current]);
          }
        } else {
          console.log('hi else');
        }
      } catch (err) {
        console.log('err in new modification', err);
      }
      // const modifiedContact = contactModal[index];
      // console.warn(`Hey ${modifiedContact}, you look different!`);
    });
  }
  const searchData = (value: string) => {
    /**dispatch({
      type: UPDATE_CONTACT_FILTER,
      payload: {search: value, pageNumber: 1},
    });**/
    setSearch(value);
  };
  const startNewChat = (num?: string) => {
    dispatch({
      type:
        auth.projectId === 'all'
          ? GLOBAL_TEMPLATE_LIST_ACTION
          : TEMPLATE_LIST_ACTION,
    });
    navigation.navigate(routeEnum.NEWCHATSCREEN, {num: num});
  };

  const getChatHistory = (item: ChatListInterface) => {
    dispatch({
      type:
        auth.projectId === 'all'
          ? GET_GLOBAL_CHAT_HISTORY_ACTION
          : GET_CHAT_HISTORY_ACTION,
      payload: {
        chat_uid: item.chatUid,
        pageNumber: 1,
        limit: API_LIMIT,
      },
    });
    navigation.navigate(routeEnum.CHATBOX, {data: item});
  };
  const checkDbAndNavigate = (item: contactInterface) => {
    if (item?.whatsapp_availability === 'true') {
      let chat = getChatItemByCandidateId(item.candidate_id);
      if (chat?.chatUid) {
        //open existing chat
        getChatHistory(chat);
      } else {
        //new chat
        startNewChat(item.phoneNumber);
      }
    } else {
      //not whatsapp number
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: t('selectContact:INAVILD'),
        textBody: t('selectContact:NOT_FOUND_IN_WHATSAPP'),
      });
    }
  };
  function renderHeader() {
    return (
      <>
        <TouchableOpacity
          style={style.chatBox}
          activeOpacity={0.5}
          onPress={() => startNewChat()}>
          <View
            style={{
              ...style.profileSection,
              backgroundColor: theme.colors.LIGHT_BG,
            }}>
            <BlackPenIcon height={dgl * 0.015} width={dgl * 0.015} />
          </View>
          <View style={style.nameSection}>
            <Text numberOfLines={1} style={style.chatTopTitle}>
              {t('selectContact:NEW_CHAT')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.chatBox}
          activeOpacity={0.5}
          onPress={() => navigation.navigate(routeEnum.ADDCONTACTSCREEN)}>
          <View
            style={{
              ...style.profileSection,
              backgroundColor: theme.colors.LIGHT_BG,
            }}>
            <AddContactIcon height={dgl * 0.015} width={dgl * 0.015} />
          </View>
          <View style={style.nameSection}>
            <Text numberOfLines={1} style={style.chatTopTitle}>
              {t('selectContact:NEW_CONTACT')}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={style.addheading}>Contacts</Text>
      </>
    );
  }
  const renderItem = (item: contactsListType) => {
    return (
      <TouchableOpacity
        style={style.chatBox}
        activeOpacity={0.5}
        onPress={() => checkDbAndNavigate(item)}> 
        <>
          <View style={style.profileSection}>
            <Text style={style.firstL}>
              {item?.contact_name?.charAt(0)?.toUpperCase()}
            </Text>
          </View>
          <View style={style.nameSection}>
            <Text numberOfLines={1} style={style.chatName}>
              {item?.contact_name}
            </Text>
          </View>
        </>
      </TouchableOpacity>
    );
  };

  const EmptyListMessage = () => {
    return (
      // Flat List Item
      <Text style={style.emptyText}>Oops! We are sorry - No results found</Text>
    );
  };
  return (
    <MenuProvider>
      <Header
        arrow
        title={title}
        subTitle={`${contactList?.contact_list_count ?? 0} Contacts`}
        search
        filter
        searchText={search}
        setSearchText={searchData}
        setPrimaryFilter={() => {}}
        setSecondaryFilter={() => {}}
      />
      <View style={style.container}>
        <FlatList
          data={contactsRef?.current?.[0] ? contactsRef?.current : []}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          ListHeaderComponent={
            search === '' && contactListFilter?.tag_filter?.length === 0
              ? renderHeader
              : null
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            loadMoredata();
          }}
          ListEmptyComponent={EmptyListMessage}
        />
      </View>
    </MenuProvider>
  );
};

export default SelectContact;
