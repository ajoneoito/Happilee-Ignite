/**
 * Home.style.ts
 * @module Home screen styles
 * @desc  Styles to Home screen
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const homeStyle = (theme: any) =>
  StyleSheet.create({
    //Chat screen styles
    chatContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatBox: {
      flexDirection: 'row',
      padding: dgl * 0.015,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    defaultBackgroundColor: {
      backgroundColor: theme.colors.V_LIGHT_BLUE,
    },
    expiredColor: {
      color: theme.colors.GRAY_DARK,
    },
    flex: {flex: 1},
    openColor: {
      color: theme.colors.GREEN_LIGHT,
    },
    defaultColor: {
      color: theme.colors.BLUE_LIGHT,
    },
    expiredBackgroundColor: {
      backgroundColor: theme.colors.GRAY_BORDER,
    },
    openBackgroundColor: {
      backgroundColor: theme.colors.V_LIGHT_GREEN,
    },
    profileStatusBackground: {backgroundColor: theme.colors.LIGHT_RED},
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
    },
    timeSection: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%',
    },
    firstL: {
      color: theme.colors.FIRST_L,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.024,
      alignSelf: 'center',
    },
    footerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    chatName: {
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.016 * theme.fontRef,
      marginRight: 5,
    },
    chatText: {
      color: theme.colors.GRAY_LIGHT,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.013 * theme.fontRef,
    },
    countBox: {
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '70%',
    },
    chatCountBox: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.TEXT_COLOR,
      width: dgl * 0.019,
      height: dgl * 0.019,
      borderRadius: (dgl * 0.019) / 2,
      alignSelf: 'center',
    },
    chatCount: {
      color: theme.colors.BACKGROUND,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.011 * theme.fontRef,
      textAlign: 'center',
    },
    status: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.01 * theme.fontRef,
      textAlign: 'center',
      marginTop: 2,
    },
    statusBox: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: dgl * 0.1,
      opacity: 0.6,
    },
    time: {
      color: theme.colors.GRAY_LIHGT,
      fontFamily: C.font.Light,
      fontSize: dgl * 0.012 * theme.fontRef,
      textAlign: 'right',
      paddingVertical: 2,
    },

    //tab switch styles
    navTab: {
      padding: dgl * 0.01,
      borderColor: 'transparent',
      borderBottomWidth: 1.7,
      // width: '33.33%',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    navTabHeader: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.015,
      color: theme.colors.BACKGROUND,
    },
    searchNave: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerSection: {
      width: '100%',
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    deletBox: {
      width: '20%',
      padding: 10,
      backgroundColor: '#E1E4E8',
    },
    emptyText: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.0135,
      color: theme.colors.GRAY_DARK,
      marginTop: '25%',
      alignSelf: 'center',
    },
    // Broadcast styles
    profileIcon: {
      borderWidth: 1,
      width: dgl * 0.043,
      height: dgl * 0.043,
      borderRadius: 100,
      backgroundColor: '#F6F8FA',
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    broadcastContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.BACKGROUND,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: dgl * 0.01,
    },
    profileTitle: {
      paddingHorizontal: dgl * 0.022,
      color: theme.colors.PRIMARY,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.0173 * theme.fontRef,
    },
    newest: {
      color: theme.colors.TEXT_COLOR,
      fontSize: dgl * 0.0163 * theme.fontRef,
      fontFamily: C.font.Regular,
      paddingHorizontal: dgl * 0.008,
      maxWidth: dgl * 0.1,
      // width: dgl * 0.1,
    },
    recent: {
      color: theme.colors.GRAY_LIGHT,
      fontSize: dgl * 0.0188 * theme.fontRef,
      fontFamily: C.font.Medium,
      width: dgl * 0.25,
    },
    toggle: {
      flexDirection: 'row',
      marginLeft: 'auto',
      alignItems: 'center',
      paddingRight: dgl * 0.008,
    },
    recentConatiner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: dgl * 0.007,
    },
    broadcastWrap: {
      flex: 1,
      margin: dgl * 0.025,
      backgroundColor: theme.colors.BACKGROUND,
    },
    newBroadcast: {
      paddingBottom: dgl * 0.035,
    },
    profileStatus: {
      width: dgl * 0.049,
      height: dgl * 0.049,
    },
    date: {
      color: theme.colors.GRAY_LIGHT,
      fontSize: dgl * 0.015 * theme.fontRef,
    },
    broadcastStatus: {
      fontSize: dgl * 0.0165 * theme.fontRef,
      width: '90%',
    },
    projectTitle: {
      alignSelf: 'center',
      marginRight: 5,
      fontFamily: C.font.Regular,
      color: theme.colors.FIRST_L,
      fontSize: dgl * 0.013 * theme.fontRef,
      maxWidth: '60%',
    },
  });
