import React from 'react';
import {t} from 'i18next';
import {useDispatch} from 'react-redux';
import {Delete, SpamIcon} from '../../../assets';
import {View, Text, Pressable} from 'react-native';
import ContactInfoStyle from '../ContactInfo.style';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import {ALERT_TYPE, Dialog} from '../../../components/AlertComponent';
import {BLOCK_CONTACT} from '../../../redux/actions/candidateDetails.action';
import {DELETE_CHATLIST_ACTION} from '../../../redux/actions/chatlist.action';

const FooterComponent = (props: {
  id: string;
  candidateId: string;
  status: string;
}) => {
  const {styles} = useThemedStyles(ContactInfoStyle);
  const dispatch = useDispatch();
  return (
    <View style={styles.footerMainView}>
      <Pressable
        onPress={() => {
          Dialog.show({
            button: t('template:CANCEL'),
            butonText: 'Delete',
            type: ALERT_TYPE.SUCCESS,
            title: 'Do yo want to delete this contact ?',
            onPressButton: () => {
              dispatch({
                type: DELETE_CHATLIST_ACTION,
                payload: {chatUid: props.id},
                from: 'ContactMainScreen',
              });
            },
          });
        }}
        style={styles.footerSubView1}>
        <Delete />
        <Text style={styles.footerText}>Delete Contact</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          Dialog.show({
            button: t('template:CANCEL'),
            butonText: props.status !== 'blocked' ? 'Block' : 'Unblock',
            type: ALERT_TYPE.SUCCESS,
            title:
              props.status !== 'blocked'
                ? 'Do yo want to BLOCK this contact ?'
                : 'Do yo want to UNBLOCK this contact ?',
            onPressButton: () => {
              dispatch({
                type: BLOCK_CONTACT,
                payload: {candidate_id: props.candidateId},
              });
            },
          });
        }}
        style={styles.footerSubView2}>
        <SpamIcon />
        <Text style={styles.footerText}>
          {props.status !== 'blocked' ? 'Block  Contact' : 'Unblock'}
        </Text>
      </Pressable>
    </View>
  );
};

export default FooterComponent;
