/**
 * Settings.style.ts
 * @module Settings screen styles
 * @desc  Styles to Settings screen
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const settingsStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
      alignItems: 'center',
    },
    settingsItem: {
      margin: '1%',
      padding: '1.53%',
      width: '95%',
      minHeight: '8%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    settingsItemText: {
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.012 * theme.fontRef,
    },
    settingsSelectValue: {
      width: '100%',
      justifyContent: 'space-between',
      // padding: '1.53%',
    },
  });
