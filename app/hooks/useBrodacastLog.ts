/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList} from 'react-native';
import useTheme from '../utils/theming/useTheme';
import {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {API_LIMIT} from '../constants/pagination';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/root.reducer';
import { Theme } from '../services/interface/themeInterface';
import {createThumbnail} from 'react-native-create-thumbnail';
import useThemedStyles from '../utils/theming/useThemedStyles';
import {BroadcastStyle} from '../screens/broadcast/Broadcast.style';
import {BROADCAST_LOG_ACTION} from '../redux/actions/broadcastList.action';
import {setBroadcastRecipientsFilter} from '../redux/slices/broadcastRecipientsFilter.slice';

export const useBroadcastLog = () => {
  const theme = useTheme() as Theme;
  const dispatch = useDispatch();
  const ref = useRef<FlatList>(null);
  const style = useThemedStyles(BroadcastStyle);
  const {key, name, created} = useRoute().params;
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const [activeTitle, setActiveTitle] = useState('Success Recipients');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const recipientsLog = useSelector(
    (state: RootState) => state.broadcastLogList,
  );
  const recipientsFilter = useSelector(
    (state: RootState) => state.broadcastRecipientsFilter,
  );

  useEffect(() => {
    dispatch({
      type: BROADCAST_LOG_ACTION,
      payload: {
        broadcast_id: key,
        status: activeTitle === 'Success Recipients' ? 'success' : 'failed',
        ...recipientsFilter,
        search: recipientsFilter?.search,
      },
    });
  }, [recipientsFilter?.search]);
  useEffect(() => {
    setActiveTitle('Success Recipients');
    ref.current?.scrollToIndex({
      index: 0,
      animated: true,
      viewPosition: 0.5,
    });
  }, []);
  // swicth screen among success and failed
  const switchScreens = (item: any) => {
    setActiveTitle(item.title);
    if (ref.current != null) {
      ref.current.scrollToItem({
        item: item,
        animated: true,
        viewPosition: 0.5,
      });
    }
    setSearch('');

    if (item.title === 'Success Recipients') {
      dispatch({
        type: BROADCAST_LOG_ACTION,
        payload: {
          broadcast_id: key,
          status: 'success',
          pageNumber: 1,
          limit: API_LIMIT,
        },
      });
    } else {
      dispatch({
        type: BROADCAST_LOG_ACTION,
        payload: {
          broadcast_id: key,
          status: 'failed',
          pageNumber: 1,
          limit: API_LIMIT,
        },
      });
    }
  };
  // search function for broadcast log success and failed recipients
  const handleSearch = (value: string) => {
    setSearch(value);
    dispatch(
      setBroadcastRecipientsFilter({
        ...recipientsFilter,
        search: value,
        pageNumber: 1,
      }),
    );
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleOut = () => {
    setFocused(false);
  };
  // Generate thumbnail if the template format is video
  async function generateThumbnail() {
    if (recipientsLog?.broadcast_data?.template_header?.format === 'VIDEO') {
      try {
        const response = await createThumbnail({
          url: recipientsLog?.broadcast_data?.template_file_url,
          timeStamp: 100,
        });
        setThumbnailUrl(response.path);
      } catch (err) {
        console.error(err);
      }
    }
  }
  useEffect(() => {
    generateThumbnail();
  }, []);
  const loadMoredata = () => {
   
    if (recipientsFilter?.hasNextPage) {
      dispatch({
        type: BROADCAST_LOG_ACTION,
        payload: {
          broadcast_id: key,
          status: activeTitle === 'Success Recipients' ? 'success' : 'failed',
          ...recipientsFilter,
          pageNumber: recipientsFilter.pageNumber + 1,
        }, 
      });
    }
  };

  // Concating template header text and body text(api response) for template format TEXT
  let temp;
  if (recipientsLog?.broadcast_data?.template_header?.format === 'TEXT') {
    temp = recipientsLog?.broadcast_data?.template_header?.text?.concat(
      recipientsLog?.broadcast_data?.template_body.text,
    );
  } else {
    temp = recipientsLog?.broadcast_data?.template_body.text;
  }

  return {
    ref,
    key,
    temp,
    name,
    style,
    theme,
    search,
    created,
    focused,
    activeTitle,
    thumbnailUrl,
    recipientsLog,
    handleOut,
    handleFocus,
    handleSearch,
    loadMoredata,
    switchScreens,
  };
};
