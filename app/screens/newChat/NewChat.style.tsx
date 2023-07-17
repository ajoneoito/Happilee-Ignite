/**
 * new chat.style.ts
 * @module new chat screen styles
 * @desc  Styles to new chat screen
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const NewChatStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    body: {
      flexDirection: 'column',
      padding: dgl * 0.02,
      justifyContent: 'space-between',
    },
    heading: {
      color: theme.colors.TEXT_BLACK,
      fontSize: dgl * 0.02,
      fontFamily: C.font.SemiBold,
      textAlign: 'left',
    },
    mobileInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dialContainer: {
      width: '22%',
      borderRadius: dgl * 0.01,
      backgroundColor: theme.colors.FIELD,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      height: dgl * 0.065,
    },
    dialCode: {
      fontFamily: C.font.Regular,
      color: theme.colors.PRIMARY,
      fontSize: dgl * 0.016,
    },
    paddedView: {
      paddingTop: dgl * 0.018,
    },
    addheading: {
      color: theme.colors.TEXT_COLOR,
      paddingLeft: dgl * 0.015,
    },
  });
