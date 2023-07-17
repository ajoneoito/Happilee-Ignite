/**
 * Select contact.style.ts
 * @module Select contact screen styles
 * @desc  Styles to Select contact screen
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const SelectContactStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    chatBox: {
      flexDirection: 'row',
      padding: dgl * 0.015,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    },
    profileSection: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: dgl * 0.005,
      backgroundColor: theme.colors.CHAT_LIST_BG,
      width: dgl * 0.055,
      height: dgl * 0.055,
      borderRadius: (dgl * 0.055) / 2,
    },
    nameSection: {
      justifyContent: 'center',
      width: '60%',
      paddingLeft: dgl * 0.021,
      flexDirection: 'column',
    },
    firstL: {
      color: theme.colors.FIRST_L,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.024,
      alignSelf: 'center',
    },
    chatName: {
      color: theme.colors.TEXT_BLACK,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.016 * theme.fontRef,
      marginRight: 5,
    },

    chatTopTitle: {
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.018 * theme.fontRef,
      marginRight: 5,
    },
    chatText: {
      color: theme.colors.GRAY_LIGHT,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.013 * theme.fontRef,
    },
    rowItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    heading: {
      color: theme.colors.TEXT_BLACK,
      fontSize: dgl * 0.025,
      fontFamily: C.font.SemiBold,
      textAlign: 'left',
    },
    parameters: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
    },
    addButtonView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
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
      height: dgl * 0.054,
    },
    dialCode: {
      fontFamily: C.font.Regular,
      color: theme.colors.PRIMARY,
      fontSize: dgl * 0.015,
    },
    paddedView: {
      paddingTop: dgl * 0.015,
    },
    addheading: {
      color: theme.colors.TEXT_BLACK,
      paddingLeft: dgl * 0.015,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.018 * theme.fontRef,
    },
    tagList: {
      //maxHeight: '20%',
      flexGrow: 1,
      justifyContent: 'center',
    },
    tagItem: {
      margin: 10,
      padding: 10,
      borderRadius: 10,
    },
    tagColor: {
      color: theme.colors.TEXT_BLACK,
    },
    tags: {
      padding: dgl * 0.02,
      backgroundColor: '#fff',
      width: '100%',
      marginVertical: dgl * 0.01,
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
      flex: 1,
      height: dgl * 0.25,
    },

    emptyText: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.0135,
      color: theme.colors.GRAY_DARK,
      marginTop: '25%',
      textAlign: 'center',
    },
  });
