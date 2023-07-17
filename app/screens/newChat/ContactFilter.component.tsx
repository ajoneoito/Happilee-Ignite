/**
 * ContactFilter.component.tsx
 * @module  Contact filter component
 * @desc Component for filtering contacts.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import React, {useEffect, useState, useRef} from 'react';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {FETCH_TAGS_ACTION} from '../../redux/actions/tagList.action';
import {UPDATE_CONTACT_FILTER} from '../../redux/actions/contactList.action';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {SelectContactStyle} from './SelectContact.style';
import useTheme from '../../utils/theming/useTheme';
const ContactFilter = () => {
  const style = useThemedStyles(SelectContactStyle);
  const dispatch = useDispatch();
  const theme = useTheme();
  const mounted = useRef(false);
  const [tag_filter, setTagFilter] = useState([]);
  const {tagListQuery, tagList} = useSelector(state => state);
  useEffect(() => {
    if (!mounted?.current) {
      dispatch({type: FETCH_TAGS_ACTION, payload: tagListQuery});
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: UPDATE_CONTACT_FILTER,
      payload: {tag_filter: tag_filter},
    });
  }, [tag_filter]);

  const renderTagItem = (item: any) => {
    let backgroundColor = tag_filter.includes(item?.item?.id)
      ? theme.colors.TEXT_COLOR
      : theme.colors.GRAY;
    return (
      <TouchableOpacity
        style={{...style.tagItem, backgroundColor: backgroundColor}}
        onPress={() =>
          tag_filter.includes(item.item.id)
            ? setTagFilter(tags => tags.filter(tag => tag !== item.item.id))
            : setTagFilter(tags => [...tags, item.item.id])
        }>
        <Text style={style.tagColor}>{item?.item?.tagName}</Text>
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
    <View style={style.tags}>
      <Text style={style.param}>{t('selectContact:FILTER_BY_TAGS')}</Text>
      <FlatList
        nestedScrollEnabled
        contentContainerStyle={{flexGrow: 1}}
        numColumns={3}
        data={tagList}
        renderItem={item => renderTagItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyListMessage}
      />
    </View>
  );
};
export default ContactFilter;
