/**
 * Entry.style.ts
 * @module Entry screen styles
 * @desc  Styles to Initial screen
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const entryStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    mainWrapper: {
      flex: 9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND,
      paddingTop: dgl * 0.03,
    },
    socondWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND,
      width: '100%',
    },
    scrollWrap: {
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
    },
    welcome: {
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.0185,
      fontWeight: '400',
      paddingTop: dgl * 0.014,
    },
    headerText: {
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.032,
      marginTop: -dgl * 0.0125,
    },
    agreeText: {
      textAlign: 'center',
      color: theme.colors.TEXT_BLACK,
      fontFamily: C.font.Regular,
      fontWeight: '400',
      fontSize: dgl * 0.016,
    },
    terms: {
      textAlign: 'center',
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.Regular,
      fontWeight: '400',
      fontSize: dgl * 0.016,
    },
    buttonContainer: {
      paddingTop: dgl * 0.1,
      paddingBottom: dgl * 0.017,
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    buttonText: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.018,
      fontFamily: C.font.SemiBold,
    },
  });
