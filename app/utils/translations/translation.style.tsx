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
export const transaltionStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
    },
    header: {
      width: '100%',
      height: '7.60%',
      backgroundColor: theme.colors.TEXT_COLOR,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    headerItem: {
      marginLeft: '5.46%',
      color: theme.colors.BACKGROUND,
      fontFamily: C.font.Bold,
      fontSize: dgl * 0.021,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#444',
      fontSize: dgl * 0.04,
      fontWeight: '600',
    },
    buttonContainer: {
      marginTop: '1.53%',
    },
    text: {
      fontSize: dgl * 0.021,
      color: theme.colors.PRIMARY,
      paddingVertical: '0.70%',
    },
    selectedText: {
      fontSize: dgl * 0.021,
      fontWeight: '600',
      color: theme.colors.PRIMARY,
      paddingVertical: '0.70%',
    },
  });
