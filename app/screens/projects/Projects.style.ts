/**
 * Projects.style.ts
 * @module Projects screen styles
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const projectStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
      paddingBottom: 10,
    },
    headerText: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.018,
      fontFamily: C.font.Medium,
    },
    descView: {
      marginLeft: 30,
    },
    mainRow: {flexDirection: 'row', justifyContent: 'space-between'},
    radioInnerView: {
      width: 8,
      height: 8,
      borderRadius: 12,
      alignSelf: 'center',
    },
    radioOuterView: {
      width: 18,
      height: 18,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      borderWidth: 2,
      marginRight: 10,
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pressableView: {
      padding: 10,
      width: '95%',
      backgroundColor: theme.colors.BACKGROUND,
      alignSelf: 'center',
      borderRadius: 15,
      marginTop: 8,
    },
    projectName: {
      color: theme.colors.INPUT_TEXT_COLOR,
      fontFamily: C.font.Medium,
      maxWidth: '70%',
      marginRight: 6,
      fontSize: dgl * 0.018,
    },
    subTextLabel: {
      color: theme.colors.GRAY_LIHGT,
      width: '26%',
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.015,
    },
    status: {
      color: theme.colors.GREEN_LIGHT,
      backgroundColor: theme.colors.V_LIGHT_GREEN,
      padding: 5,
      borderRadius: 15,
      paddingHorizontal: 7,
    },
    subTextValue: {
      color: theme.colors.GRAY_LIHGT,
      fontSize: dgl * 0.017,
      fontFamily: C.font.Medium,
    },
  });
