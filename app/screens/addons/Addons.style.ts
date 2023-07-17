/**
 * Addons.style.ts
 * @module Addons screen styles
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';
const dgl = C.measures.dgl;
export const FbLeadStyle = (theme: any) =>
  StyleSheet.create({
    conatiner: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    image: {
      resizeMode: 'contain',
      width: dgl * 0.034,
      height: dgl * 0.034,
      borderRadius: (dgl * 0.034) / 2,
      alignSelf: 'center',
    },
    listItems: {
      flexDirection: 'row',
      paddingVertical: dgl * 0.014,
      alignContent: 'center',
      alignItems: 'center',
      marginHorizontal: dgl * 0.04,
    },
    name: {
      fontSize: dgl * 0.016,
      fontFamily: C.font.Regular,
      color: theme.colors.MESSAGE_TEXT_COLOR,
      paddingHorizontal: dgl * 0.02,
    },
    singleLine: {
      width: '90%',
      borderWidth: 0.55,
      alignSelf: 'center',
      marginVertical: dgl * 0.006,
      borderColor: theme.colors.GRAY_LINE,
    },
    mainWrapper: {
      paddingTop: dgl * 0.01,
    },
    emptyText: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.0135,
      color: theme.colors.GRAY_DARK,
      marginTop: '25%',
      textAlign: 'center',
      marginBottom: '25%',
    },


  });
