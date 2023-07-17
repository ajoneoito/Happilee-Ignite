/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import useStateRef from './useStateRef';
import {
  GET_CHATLIST_ACTION,
  DELETE_CHATLIST_ACTION,
  UPDATE_CHAT_COUNT_ACTION,
  GET_GLOBAL_CHATLIST_ACTION,
} from '../redux/actions/chatlist.action';
import {
  GET_CHAT_HISTORY_ACTION,
  GET_GLOBAL_CHAT_HISTORY_ACTION,
} from '../redux/actions/chathistory.action';
import realm from '../utils/database/schema';
import {routeEnum} from '../enums/route.enum';
import {
  BROADCAST_LOG_ACTION,
  BROADCAST_LIST_ACTION,
} from '../redux/actions/broadcastList.action';
import useTheme from '../utils/theming/useTheme';
import {useRef, useState, useEffect} from 'react';
import {ROOT_PATH} from '../constants/folderPath';
import {homeStyle} from '../screens/home/Home.style';
import {useDispatch, useSelector} from 'react-redux';
import useDebouncedSearch from './useDebouncedSearch';
import {RootState} from '../redux/store/root.reducer';
import NetInfo from '@react-native-community/netinfo';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {navigate} from '../navigation/useNavigationUtils';
import useThemedStyles from '../utils/theming/useThemedStyles';
import {ChatListInterface} from '../utils/database/interfaces';
import {SPINNER_ACTION} from '../redux/actions/spinner.action';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {getAllChats} from '../utils/database/realmHooks/useChatList';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import {setchatListFilter} from '../redux/slices/chatlistfilter.slice';
import {setBroadcastFilter} from '../redux/slices/broadcastfilter.slice';
import {getAllBroadcast} from '../utils/database/realmHooks/useBroadcast';
import {setBroadcastListItems} from '../redux/slices/broadcastList.slice';
import {API_LIMIT, REALM_LIMIT, REALM_OFFSET} from '../constants/pagination';

const chatListModal = realm.objects('ChatList');

const useHomeScreenHook = () => {
  // Theme switching,access the currently active theme
  const limit = REALM_LIMIT;
  const theme = useTheme();
  const newData = useRef<string>();
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const style = useThemedStyles(homeStyle);

  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState(true);
  const {auth} = useSelector(state => state) as any;
  const [active, setActive] = useState('chats');
  const changeTab = (key: string) => {
    setActive(key);
    setSearch('');
  };
  const [paginated, setPaginated] = useState(false);
  const [offset, setOffset] = useState(REALM_OFFSET);
  const [chats, setChats, chatsRef] = useStateRef([]);
  const searchQuery = useDebouncedSearch(search, 500);
  const [secondaryFilter, setSecondaryFilter] = useState('');
  const [isOnline, setIsOnline] = useState<boolean | null>(true);
  const [primaryFilter, setPrimaryFilter, primaryFilterRef] = useStateRef('');
  // Broadcast states
  const [broadcastList] = useState([]);
  const [broadcastPaginated, setBroadcastPaginated] = useState(false);
  const [broadcastOffset, setBroadcastOffset] = useState(REALM_OFFSET);
  // redux states
  const chatListFilter = useSelector(
    (state: RootState) => state.chatListFilter,
  );
  const broadcastFilter = useSelector(
    (state: RootState) => state.broadcastFilter,
  );
  const activeTab = useSelector((state: RootState) => state.tab);
  const chatListState = useSelector((state: RootState) => state.chatList);
  const broadcastState = useSelector((state: RootState) => state.broadcast);
  const broadcastListnew = useSelector(
    (state: RootState) => state.broadcastList,
  );
  const broadcastListCollection = useSelector(
    (state: RootState) => state.broadcastListCollection,
  );
  const updateBroadcast = useSelector(
    (state: RootState) => state.updateBroadcast.update,
  );

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });
  }, []);

  useEffect(() => {
    try {
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]).then(granted => {
          if (
            granted['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            ReactNativeBlobUtil.fs
              .exists(ROOT_PATH)
              .then(response => {
                if (response === false) {
                  ReactNativeBlobUtil.fs
                    .mkdir(ROOT_PATH)
                    .then(() => {})
                    .catch(() => {});
                } else {
                }
              })
              .catch(() => {});
          } else {
            Alert.alert('Allow storage_permission');
          }
        });
      } else if (Platform.OS === 'ios') {
        requestMultiple([
          PERMISSIONS.IOS.PHOTO_LIBRARY,
          PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
        ]).then(statuses => {
          console.log('Camera', statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]);
          console.log(
            'FaceID',
            statuses[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY],
          );
        });
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    let temp = getAllBroadcast(
      search,
      auth?.projectId,
      false,
      broadcastOffset,
      limit,
    );
    dispatch(setBroadcastListItems(temp));
    dispatch({
      type: BROADCAST_LIST_ACTION,
      payload: broadcastFilter,
    });
    temp = getAllBroadcast(
      search,
      auth?.projectId,
      false,
      broadcastOffset,
      limit,
    );
    dispatch(setBroadcastListItems(temp));

    setBroadcastOffset(broadcastOffset + limit);
  }, [auth?.projectId]);
  useEffect(() => {
    let temp = getAllBroadcast(
      search,
      auth?.projectId,
      false,
      // broadcastOffset,
      // limit,
    );
    dispatch(setBroadcastListItems(temp));
  }, [broadcastFilter?.search, active]);
  useEffect(() => {
    if (updateBroadcast === true) {
      let temp = getAllBroadcast(
        search,
        auth?.projectId,
        false,
        // REALM_LIMIT,
        // limit,
      );
      dispatch(setBroadcastListItems(temp));
    }
  }, [updateBroadcast]);

  useEffect(() => {
    //clear offset
    if (activeTab) {
      // added to check if component mounted; if its not present below code gets executed on mount
      setOffset(REALM_OFFSET);
      // chatsRef.current = [];
      setChats([...chatsRef.current]);
      if (isOnline) {
        fetchFromApi(false);
      }
      setChats(
        getAllChats(
          auth?.projectId,
          offset,
          limit,
          search,
          primaryFilterRef?.current,
          secondaryFilter,
        ),
      );
    }
  }, [primaryFilterRef?.current, secondaryFilter, chatListFilter?.search]); //primary/seconday change cause chatfilter change

  useEffect(() => {
    if (activeTab === 'chats' && searchQuery?.length) {
      dispatch(
        setchatListFilter({
          ...chatListFilter,
          search: searchQuery,
          pageNumber: 1,
        }),
      );
    }
  }, [searchQuery]);

  useEffect(() => {
    mounted.current = true;
    setChats(
      getAllChats(
        auth?.projectId,
        offset,
        limit,
        search,
        primaryFilterRef?.current,
        secondaryFilter,
      ),
    );
    setOffset(offset + limit);
    if (isOnline) {
      fetchFromApi(true);
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      let temp = '';
      setSearch('');
      mounted.current = true;
      setChats(
        getAllChats(
          auth?.projectId,
          offset,
          limit,
          search,
          primaryFilterRef?.current,
          secondaryFilter,
        ),
      );
      dispatch(
        setchatListFilter({
          pageNumber: 1,
          primary_filter: '',
          secondary_filter: '',
          limit: API_LIMIT,
          search: '',
        }),
      );
      setOffset(offset + limit);
      if (isOnline) {
        fetchFromApi(false);
      }
    }
    return () => {
      mounted.current = false;
    };
  }, [isOnline]);

  useEffect(() => {
    try {
      chatListModal.addListener(onRealmChange);
    } catch (error) {}
    return () => {
      realm.removeListener('change', onRealmChange);
    };
  }, []);

  const sortAndInsert = (item: ChatListInterface) => {
    // Use binary search to find the index where the new object should be inserted
    let low = 0;
    let high = chatsRef.current.length - 1;
    let index = -1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (
        new Date(chatsRef.current[mid].message_created_time) <
        new Date(`${item.message_created_time}`)
      ) {
        high = mid - 1;
      } else {
        index = mid;
        low = mid + 1;
      }
    }

    // Insert the new object at the appropriate index
    if (index === -1) {
      chatsRef.current.unshift(item);
      setChats([...chatsRef.current]);
    } else {
      chatsRef.current.splice(index, 0, item);
      setChats([...chatsRef.current]);
    }
  };

  function onRealmChange(modal: any, changes: any) {
    // Handle newly added chat objects
    changes.insertions?.forEach((index: number) => {
      try {
        const insertedChat = JSON.parse(JSON.stringify(modal[index]));
        let itemExists = -1;
        if (chatsRef?.current && chatsRef?.current[0]) {
          itemExists = chatsRef?.current?.findIndex(
            obj => obj.id === insertedChat.id,
          );
        } else {
          chatsRef.current = [];
        }

        if (
          itemExists < 0 &&
          insertedChat?.projectId === auth?.projectId &&
          insertedChat?.status !== 'blocked'
        ) {
          sortAndInsert(insertedChat);
        } else if (
          itemExists < 0 &&
          insertedChat?.projectId === auth?.projectId &&
          primaryFilterRef?.current === 'BLOCKED'
        ) {
          sortAndInsert(insertedChat);
        } else {
          // console.log('hi else');
        }
      } catch (err) {
        console.log('error in insertion', err);
      }
    });
    changes.deletions?.forEach(() => {
      chatsRef.current = chatsRef.current.filter(
        item => item.id !== newData.current,
      );
      setChats([...chatsRef.current]);
    });
    // Handle chat history objects that were modified
    changes.newModifications?.forEach((index: number) => {
      // const modifiedDog = historyModal[index];
      try {
        const insertedChat = JSON.parse(JSON.stringify(modal[index]));
        // console.log('modification', insertedChat, chatsRef.current);
        const itemExists = chatsRef.current.find(
          obj => obj.id === insertedChat.id,
        );
        if (
          !itemExists &&
          insertedChat?.projectId === auth?.projectId &&
          insertedChat.master_operator_id === auth.operator_id
        ) {
          //setChats(oldArry => [insertedChat, ...oldArry]);
          sortAndInsert(insertedChat);
        } else if (
          itemExists &&
          insertedChat.projectId === auth?.projectId &&
          insertedChat.status !== 'blocked' &&
          insertedChat.master_operator_id === auth.operator_id
        ) {
          const fromIndex = chatsRef.current.findIndex(
            item => item.id === insertedChat.id,
          );
          if (
            moment(new Date(insertedChat.message_created_time)).isAfter(
              moment(new Date(chatsRef?.current?.[0]?.message_created_time)),
            )
          ) {
            chatsRef.current = [
              insertedChat,
              ...chatsRef.current.slice(0, fromIndex),
              ...chatsRef.current.slice(fromIndex + 1),
            ];
            setChats([...chatsRef.current]);
          } else {
            chatsRef.current = [
              ...chatsRef.current.slice(0, fromIndex),
              insertedChat,
              ...chatsRef.current.slice(fromIndex + 1),
            ];
            setChats([...chatsRef.current]);
          }
        } else if (
          itemExists &&
          insertedChat.projectId === auth?.projectId &&
          (insertedChat.master_operator_id !== auth.operator_id ||
            insertedChat.status === 'blocked')
        ) {
          if (auth?.userRole === '2' || auth?.userRole === 2) {
            const fromIndex = chatsRef.current.findIndex(
              item => item.id === insertedChat.id,
            );
            if (
              moment(new Date(insertedChat.message_created_time)).isAfter(
                moment(new Date(chatsRef?.current?.[0]?.message_created_time)),
              )
            ) {
              chatsRef.current = [
                insertedChat,
                ...chatsRef.current.slice(0, fromIndex),
                ...chatsRef.current.slice(fromIndex + 1),
              ];
              setChats([...chatsRef.current]);
            } else {
              chatsRef.current = [
                ...chatsRef.current.slice(0, fromIndex),
                insertedChat,
                ...chatsRef.current.slice(fromIndex + 1),
              ];
              setChats([...chatsRef.current]);
            }
          } else {
            chatsRef.current = chatsRef.current.filter(
              item => item.id !== insertedChat.id,
            );
            setChats([...chatsRef.current]);
          }
        } else {
          setChats([...chatsRef.current]);
        }
      } catch (err) {
        console.log('err', err);
      }
    });
  }
  function fetchFromApi(showSpinner: boolean) {
    if (showSpinner) {
      dispatch({
        type: SPINNER_ACTION,
        payload: {
          spinning: true,
          title: 'Intialising...',
          body: 'Please wait a moment',
        },
      });
    }
    if (
      auth.userRole === '2' &&
      auth.projectId === 'all' &&
      auth.projectName === 'All Projects'
    ) {
      dispatch({
        type: GET_GLOBAL_CHATLIST_ACTION,
        payload: chatListFilter,
      });
    } else {
      dispatch({type: GET_CHATLIST_ACTION, payload: chatListFilter});
    }
  }
  const searchData = (value: string) => {
    setSearch(value);
    if (activeTab === 'chats') {
      dispatch(
        setchatListFilter({
          ...chatListFilter,
          search: value,
          pageNumber: 1,
        }),
      );
    } else if (activeTab === 'broadcast') {
      dispatch(
        setBroadcastFilter({
          ...broadcastFilter,
          search: value,
          pageNumber: 1,
        }),
      );
    }
  };

  const applyPrimaryFilter = (value: string) => {
    primaryFilterRef.current = value;
    setPrimaryFilter(primaryFilterRef?.current);
    setSecondaryFilter(''); //moved this here from heder primery onpress
    if (activeTab === 'chats') {
      dispatch(
        setchatListFilter({
          ...chatListFilter,
          primary_filter: value,
          secondary_filter: '',
          pageNumber: 1,
        }),
      );
    }
  };

  const applySecondaryFilter = (value: string) => {
    setSecondaryFilter(value);
    if (activeTab === 'chats') {
      dispatch(
        setchatListFilter({
          ...chatListFilter,
          secondary_filter: value,
          pageNumber: 1,
        }),
      );
    }
  };

  const loadMoreBroadcastList = () => {
    if (broadcastState.hasNextpage === true) {
      dispatch(
        setBroadcastFilter({
          ...broadcastFilter,
          pageNumber: broadcastFilter.pageNumber + 1,
        }),
      );
    }
    dispatch({
      type: BROADCAST_LIST_ACTION,
      payload: {
        ...broadcastFilter,
        pageNumber: broadcastFilter.pageNumber + 1,
      },
    });

    if (!broadcastPaginated) {
      let paginatedArray = getAllBroadcast(
        search,
        auth?.projectId,
        false,
        // offset,
        // limit,
        broadcastOffset,
        broadcastOffset + limit,
      );
      const temp = [...broadcastListnew, ...paginatedArray];
      dispatch(setBroadcastListItems(temp));

      setBroadcastOffset(broadcastOffset + limit);

      if (paginatedArray.length < limit) {
        setBroadcastPaginated(true);
      }
    }
  };
  const loadMoredata = () => {
    if (chatListState.hasNextpage === true) {
      dispatch(
        setchatListFilter({
          ...chatListFilter,
          pageNumber: chatListState.pageNumber + 1,
        }),
      );
      if (isOnline) {
        fetchFromApi(false);
      }
    }
    if (!paginated) {
      let paginatedArray = getAllChats(
        auth?.projectId,
        offset,
        offset + limit,
        search,
        primaryFilterRef?.current,
        secondaryFilter,
      );

      setOffset(offset + limit);
      paginatedArray?.map(insertedChat => {
        let itemExists = chatsRef.current.find(
          obj => obj.id === insertedChat.id,
        );
        if (!itemExists && insertedChat?.projectId === auth?.projectId) {
          //chatsRef.current = [...oldArry, insertedChat];
          //setChats([...chatsRef.current]);
          sortAndInsert(insertedChat);
        }
      });
      if (paginatedArray.length < limit) {
        setPaginated(true);
      }
    }
  };

  const handleBroadcastLog = (item: any) => {
    dispatch({
      type: BROADCAST_LOG_ACTION,
      payload: {
        broadcast_id: item.id,
        status: 'success',
        pageNumber: 1,
        limit: API_LIMIT,
      },
    });
    dispatch({
      type: SPINNER_ACTION,
      payload: {
        spinning: true,
        title: 'loading...',
        body: 'Please wait a moment',
      },
    });
    navigate(routeEnum.BROADCASTLOGSCREEN, {
      key: item.id,
      name: item.name,
      created: item.createdAt,
    });
  };
  const handleNewBroadcast = () => {
    dispatch({
      type: SPINNER_ACTION,
      payload: {
        spinning: true,
        title: 'Intialising...',
        body: 'Please wait a moment',
      },
    });
    navigate(routeEnum.NEWBROADCASTSCREEN);
  };
  const handleNewestData = () => {
    setToggle(!toggle);
    if (toggle) {
      dispatch(
        setBroadcastListItems(
          getAllBroadcast(
            search,
            auth?.projectId,
            true,
            REALM_OFFSET,
            REALM_LIMIT,
          ),
        ),
      );
      // setBroadcastList(getAllBroadcast(search, auth?.projectId, true));
    } else {
      dispatch(
        setBroadcastListItems(
          getAllBroadcast(
            search,
            auth?.projectId,
            false,
            REALM_OFFSET,
            REALM_LIMIT,
          ),
        ),
      );
      // setBroadcastList(getAllBroadcast(search, auth?.projectId, false));
    }
  };
  const handleCSV = () => {
    navigate(routeEnum.TEMPLATESCREEN, {num: 'upload', key: 'upload'});
  };
  const deletChat = (id?: string) => {
    dispatch({type: DELETE_CHATLIST_ACTION, payload: {chatUid: id}});
  };

  const getChatHistory = (item: ChatListInterface) => {
    try {
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
      dispatch({
        type: UPDATE_CHAT_COUNT_ACTION,
        payload: {
          candidate_id: item?.candidateId,
          chatUid: item?.chatUid,
        },
      });
      navigate(routeEnum.CHATBOX, {data: item});
    } catch (error) {}
  };

  return {
    auth,
    chats,
    style,
    limit,
    theme,
    active,
    offset,
    search,
    toggle,
    newData,
    mounted,
    isOnline,
    chatsRef,
    activeTab,
    paginated,
    searchQuery,
    broadcastList,
    chatListState,
    primaryFilter,
    broadcastState,
    chatListFilter,
    broadcastOffset,
    broadcastFilter,
    secondaryFilter,
    primaryFilterRef,
    broadcastListnew,
    broadcastPaginated,
    deletChat,
    changeTab,
    handleCSV,
    searchData,
    loadMoredata,
    getChatHistory,
    handleNewestData,
    handleBroadcastLog,
    applyPrimaryFilter,
    handleNewBroadcast,
    applySecondaryFilter,
    loadMoreBroadcastList,
    broadcastListCollection,
  };
};

export default useHomeScreenHook;
