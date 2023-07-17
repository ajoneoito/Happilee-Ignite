/**
 * Auth.style.ts
 * @module Authentication screens styles
 * @desc  Styles to login and otp verification screens
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const authenticationStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.BACKGROUND,
      paddingBottom: dgl * 0.005,
    },
    scrollContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
    },
    scrollWidth: {width: '100%'},
    containerOne: {
      flex: 9,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    containerTwo: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontSize: dgl * 0.025,
      fontFamily: C.font.SemiBold,
      textAlign: 'center',
      color: theme.colors.TEXT_COLOR,
      paddingTop: dgl * 0.01,
    },
    bodyText: {
      fontSize: dgl * 0.017,
      fontFamily: C.font.Regular,
      textAlign: 'center',
      color: theme.colors.GRAY_LIHGT,
    },
    headerSection: {
      width: '90%',
      padding: dgl * 0.02,
      marginBottom: dgl * 0.05,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleButton: {
      fontSize: dgl * 0.0165,
      fontFamily: C.font.SemiBold,
      textAlign: 'center',
      color: theme.colors.TEXT_COLOR,
      backgroundColor: '#ffffff',
    },
    buttonText: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.017,
      fontFamily: C.font.SemiBold,
      alignSelf: 'center',
    },
    button: {
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    orText: {
      fontFamily: C.font.Medium,
      color: theme.colors.PRIMARY,
      paddingVertical: dgl * 0.03,
      fontSize: dgl * 0.016,
    },
    loginMobileContainer: {width: '90%'},
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
      alignSelf: 'center',
    },
    otpContainer: {
      width: '90%',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: dgl * 0.04,
    },
    box: {
      height: dgl * 0.075,
      width: '15.3%',
      borderRadius: dgl * 0.01,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.FIELD,
    },
    text: {
      fontSize: dgl * 0.028,
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.SemiBold,
      textAlign: 'center',
      padding: 0,
      marginTop: dgl * 0.01,
    },
    focus: {
      borderWidth: 1,
      // borderRadius: dgl * 0.01,
      borderColor: theme.colors.TEXT_COLOR,
      backgroundColor: theme.colors.FIELD,
    },
    errorStyle: {
      color: '#DD5147',
      fontFamily: C.font.Medium,
      fontSize: 12,
      justifyContent: 'space-around',
    },
    info: {marginTop: dgl * -0.025},
    input: {paddingVertical: dgl * 0.029},
    bottomBox: {paddingBottom: dgl * 0.021},
    errorView: {},
  });
