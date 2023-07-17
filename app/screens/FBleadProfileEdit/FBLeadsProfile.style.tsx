import {StyleSheet} from 'react-native';
import {C} from '../../constants';
import measures from '../../constants/measures';

const dgl = C.measures.dgl;
export const FBLeadsProfileStyle = (theme: any) =>
  StyleSheet.create({
    backArrow: {},
    border: {
      borderBottomColor: '#E5E5E5',
      borderBottomWidth: 0.8,
      marginVertical: 15,
    },
    box: {
      height: dgl * 0.075,
      width: '15.3%',
      borderRadius: dgl * 0.01,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.FIELD,
    },
    btnText1: {
      color: '#6A737D',
      fontSize: dgl * 0.0165,
      fontFamily: C.font.SemiBold,
    },
    btnText2: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.0165,
      fontFamily: C.font.SemiBold,
    },
    button1: {
      borderColor: '#012040',
      borderWidth: 0.8,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
      paddingVertical: 8,
    },
    button2: {
      borderColor: 'transparent',
      borderWidth: 0.8,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
      paddingVertical: 8,
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    buttonConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: dgl * 0.02,
    },
    buttonView: {
      backgroundColor: theme.colors.TEXT_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      padding: dgl * 0.015,
      margin: dgl * 0.03,
    },
    buttonText: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.019,
      fontFamily: C.font.SemiBold,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: dgl * 0.04,
    },
    containerBackground: {
      backgroundColor: '#F6F8FA',
      marginVertical: dgl * 0.018,
    },
    contentContainerStyle: {
      marginVertical: dgl * 0.018,
    },
    contentContainerStyle2: {
      backgroundColor: '#ECECEC',
    },
    dialContainer: {
      width: '35%',
      borderRadius: dgl * 0.01,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      alignSelf: 'center',
    },
    dialCode: {
      fontFamily: C.font.Regular,
      color: theme.colors.PRIMARY,
      fontSize: dgl * 0.016,
    },
    flex: {flex: 1},
    flexGrow: {flexGrow: 1},
    focus: {
      borderWidth: 1,
      borderColor: theme.colors.TEXT_COLOR,
      backgroundColor: theme.colors.FIELD,
    },
    inputContainer: {
      marginBottom: dgl * 0.015,
    },
    headerSection: {
      backgroundColor: theme.colors.TEXT_COLOR,
      height: measures.barHeight,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerText: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.017,
      fontFamily: C.font.Medium,
    },
    innerView: {
      margin: dgl * 0.03,
    },
    inputStyle: {
      marginTop: -5,
      fontSize: dgl * 0.015,
      backgroundColor: 'transparent',
    },
    mainView: {
      backgroundColor: theme.colors.BACKGROUND,
      flex: 1,
    },
    mobileInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: dgl * 0.015,
    },
    modalContainer: {
      flex: 0.75,
      backgroundColor: '#fff',
      borderTopLeftRadius: 10,
      borderTopEndRadius: 10,
      width: measures.windowWidth,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalHeaderTextStyle: {
      color: '#24292E',
      fontSize: dgl * 0.0185,
      fontFamily: C.font.Medium,
    },
    modalStyle: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    profilePic: {
      backgroundColor: theme.colors.BACKGROUND_DP,
      width: dgl * 0.085,
      height: dgl * 0.085,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profilePicText: {
      fontSize: dgl * 0.045,
      fontFamily: C.font.Bold,
      color: theme.colors.TEXT_COLOR,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scrollContainer: {
      margin: dgl * 0.03,
      paddingBottom: dgl * 0.03,
      marginTop: dgl * 0.018,
    },
    subHeaderText: {
      fontSize: dgl * 0.015,
      fontFamily: C.font.SemiBold,
      color: theme.colors.MESSAGE_TEXT_COLOR,
    },
    text: {
      fontSize: dgl * 0.028,
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.SemiBold,
      textAlign: 'center',
      padding: 0,
      marginTop: dgl * 0.01,
    },
    textStyle: {
      color: theme.colors.TEXT_COLOR,
      fontSize: dgl * 0.017,
      fontFamily: C.font.SemiBold,
    },
    profile: {
      marginVertical: dgl * 0.015,
    },
    inputTextStyle: {
      marginTop: dgl * 0.001,
    },
    verifyText: {
      width: '85%',
      fontSize: dgl * 0.018,
      lineHeight: 23,
      marginBottom: dgl * 0.018,
    },
  });
