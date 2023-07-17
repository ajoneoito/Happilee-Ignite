/**
 * Add contact.style.ts
 * @module Add contact screen styles
 * @desc  Styles to Add contact screen
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import {StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const AddContactStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    body: {
      flexDirection: 'column',
      padding: dgl * 0.02,
      justifyContent: 'space-between',
    },
    heading: {
      color: theme.colors.TEXT_BLACK,
      fontSize: dgl * 0.02,
      fontFamily: C.font.SemiBold,
      textAlign: 'left',
    },
    parameters: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingTop: dgl * 0.025,
      alignItems: 'center',
    },
    scroll: {paddingBottom: dgl * 0.08},
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
      height: dgl * 0.065,
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
      color: theme.colors.TEXT_COLOR,
      paddingLeft: dgl * 0.015,
      paddingTop: 10,
    },
  });
