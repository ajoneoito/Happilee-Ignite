/**
 * broadcast.style.ts
 * @module Broadcast screen styles
 * @desc  Styles for broadcast screens
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';
const dgl = C.measures.dgl;
const windowWidth = C.measures.windowWidth
export const BroadcastStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    mainConatiner: {flex: 1},
    wraper: {flexDirection: 'column'},
    chatBox: {
      flexDirection: 'row',
      padding: dgl * 0.015,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    },
    mainWraper: {
      paddingHorizontal: 0,
      paddingVertical: 17,
    },
    profileSection: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: dgl * 0.005,
      backgroundColor: theme.colors.CHAT_LIST_BG,
      width: dgl * 0.051,
      height: dgl * 0.051,
      borderRadius: (dgl * 0.055) / 2,
    },
    nameSection: {
      justifyContent: 'center',
      width: '60%',
      paddingLeft: dgl * 0.021,
      flexDirection: 'column',
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.Medium,
    },
    nameLog: {
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.017 * theme.fontRef,
    },
    firstL: {
      color: theme.colors.FIRST_L,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.022,
      alignSelf: 'center',
    },
    chatName: {
      color: theme.colors.TEXT_BLACK,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.016 * theme.fontRef,
      marginRight: 5,
    },
    selectedName: {
      color: '#24292E',
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.014 * theme.fontRef,
    },
    selectedItemConatiner: {
      borderRadius: 100,
      paddingVertical: 10,
      flexDirection: 'row',
      marginHorizontal: 10,
    },
    selected: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    firstName: {
      paddingVertical: dgl * 0.01,
      alignSelf: 'center',
      width: dgl * 0.045,
      paddingHorizontal: dgl * 0.006,
    },
    cancel: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    horizontalLine: {
      width: '100%',
      borderWidth: 0.2,
      height: 0,
      borderColor: '#E1E4E8',
    },
    circleActive: {borderColor: theme.colors.TEXT_COLOR},
    circleDisable: {
      borderColor: theme.colors.ASH,
    },
    circleBgActive: {backgroundColor: '#199CD9', borderColor: '#199CD9'},
    circleBg: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },

    // broadcast filter styles
    paramConatiner: {
      flex: 1,
    },
    mainWrap: {
      paddingVertical: dgl * 0.017,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: dgl * 0.115,
    },
    wrapper: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    btn: {paddingBottom: 10},
    inputContainer: {paddingBottom: dgl * 0.02},
    radioButton: {
      width: dgl * 0.024,
      height: dgl * 0.024,
      borderRadius: 100,
      borderWidth: 2,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      paddingRight: dgl * 0.05,
      fontSize: dgl * 0.02,
      fontFamily: C.font.Regular,
      color: theme.colors.PRIMARY,
    },
    circle: {
      width: dgl * 0.012,
      height: dgl * 0.012,
      borderRadius: 100,
      borderWidth: 1,
      position: 'absolute',
      alignSelf: 'center',
    },
    containerOne: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      width: '90%',
      alignItems: 'center',
    },
    param: {
      paddingRight: dgl * 0.05,
      fontSize: dgl * 0.02,
      fontFamily: C.font.Regular,
      color: theme.colors.GRAY_LIGHT,
    },
    filter: {
      padding: dgl * 0.02,
      backgroundColor: '#fff',
      width: '100%',
      marginVertical: dgl * 0.01,
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
    },
    createParams: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: dgl * 0.02,
      paddingBottom: dgl * 0.025,
    },
    createText: {
      paddingRight: dgl * 0.05,
      fontSize: dgl * 0.02,
      fontFamily: C.font.SemiBold,
      color: theme.colors.TEXT_COLOR,
      paddingHorizontal: dgl * 0.02,
    },
    ButtonContainer: {
      width: '60%',
      padding: dgl * 0.01,
    },
    tags: {
      padding: dgl * 0.02,
      backgroundColor: '#fff',
      width: '100%',
      marginVertical: dgl * 0.008,
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
      flex: 1,
    },
    tagButton: {
      paddingHorizontal: dgl * 0.015,
      backgroundColor: theme.colors.GRAY,
      borderRadius: 32,
      margin: dgl * 0.007,
      alignItems: 'center',
      paddingVertical: dgl * 0.006,
    },
    contentContainerTags: {},
    bgDark: {
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    bgActive: {
      backgroundColor: theme.colors.GRAY,
    },
    text: {
      fontFamily: C.font.Regular,
      color: theme.colors.BACKGROUND,
    },
    activeText: {
      fontFamily: C.font.Regular,
      color: theme.colors.INPUT_TEXT_COLOR,
    },
    modal: {width: '90%', alignSelf: 'center'},
    emptyText: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.0135,
      color: theme.colors.GRAY_DARK,
      marginTop: '25%',
      textAlign: 'center',
      marginBottom: '25%',
    },
    logConatiner: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    logTemp: {
      flex: 1,
      width: '90%',
      alignSelf: 'center',
    },
    recipients: {
      width: '90%',
      alignSelf: 'center',
      marginTop: dgl * 0.05,
    },
    navTab: {
      paddingVertical: dgl * 0.006,
      paddingHorizontal: dgl * 0.023,
      borderRadius: 4,
    },
    logTitle: {
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.015,
      color: theme.colors.MESSAGE_TEXT_COLOR,
      alignSelf: 'center',
    },
    textBox: {
      width: '83%',
      backgroundColor: theme.colors.CHAT_LIST_BG,
      paddingHorizontal: dgl * 0.013,
      marginTop: dgl * 0.022,
      paddingVertical: dgl * 0.013,
      borderRadius: 8,
      alignSelf: 'center',
      alignContent:'center',
      justifyContent:'center',
    },
    templateText: {
      color: theme.colors.PRIMARY,
      fontSize: dgl * 0.0177,
      fontFamily: C.font.Regular,
      letterSpacing: -0.5,
    },
    image: {
      resizeMode: 'contain',
      width: dgl * 0.32,
      height: dgl * 0.18,
      alignSelf: 'center',
    },
    activityIndicator: {
      position: 'absolute',
      alignSelf: 'center',
      top: dgl * 0.1,
    },
    tagwrap: {
      flexGrow: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    input: {
      height: dgl * 0.06,
    },
    search: {
      width: '97%',
      height: dgl * 0.05,
      borderRadius: 10,
      paddingHorizontal: dgl * 0.02,
      backgroundColor: theme.colors.FIELD,
      borderWidth: 1,
    },
    searchContainer: {marginTop: 10},
    tagContainer: {flex: 1},
    titleEnable: {backgroundColor: theme.colors.TEXT_COLOR},
    title1: {backgroundColor:theme.colors.LIGHT_BG},
    activeColor: {color: theme.colors.BACKGROUND},
    inactiveColor: {color: theme.colors.TEXT_COLOR},
    recipientsContainer: {flexGrow: 1, width: '92%', alignSelf: 'center'},
    textContainer:{width: windowWidth / 1.3},
    readmore:{
      color: theme.colors.TEXT_COLOR,
    },
    textStyle:{
      maxHeight:260,
    },
    log:{flex:1}
    
  });
