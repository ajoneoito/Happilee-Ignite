/**
 * ContactInfo.style.ts
 * @module contact information screen styles
 * @desc style to contact information screen
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {StyleSheet} from 'react-native';
import {C} from '../../constants';
import {Platform} from 'react-native';

const ContactInfoStyle = (theme: any) => {
  const dgl = C.measures.dgl;
  const styles = StyleSheet.create({
    bottomBorder: {
      width: '95%',
      borderBottomColor: '#E1E4E8',
      borderBottomWidth: 1,
      alignSelf: 'center',
      marginVertical: 12,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    contactNumber: {
      fontSize: dgl * 0.013,
      color: theme.colors.GRAY_LIHGT,
      textAlign: 'center',
      marginTop: -4,
      fontFamily: C.font.Medium,
    },
    contentContainerStyle: {flexGrow: 1},
    dpText: {
      fontSize: dgl * 0.05,
      fontWeight: 'bold',
      color: theme.colors.TEXT_COLOR,
    },
    dpView: {
      width: dgl * 0.109,
      height: dgl * 0.109,
      borderRadius: dgl * 0.109,
      backgroundColor: theme.colors.BACKGROUND_DP,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: dgl * 0.02,
    },
    dropdown: {
      alignSelf: 'center',
      marginTop: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.TEXT_COLOR,
      width: dgl / 2.5,
      maxHeight: dgl / 5,
      padding: 10,
    },
    editSection: {
      minHeight: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flex: {flex: 1},
    footerText: {
      color: theme.colors.DELETE,
      marginLeft: 8,
      fontSize: dgl * 0.015,
      fontWeight: '400',
    },
    footerMainView: {
      borderTopWidth: 1.4,
      padding: 15,
      borderTopColor: theme.colors.LIGHT_BG_BORDER,
      paddingLeft: 30,
    },
    footerSubView1: {flexDirection: 'row', marginBottom: 30},
    footerSubView2: {flexDirection: 'row', marginBottom: 5},
    inputText: {
      width: '70%',
      color: theme.colors.INPUT_TEXT_COLOR,
      padding: 4,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.015,
    },
    labelText: {
      fontSize: dgl * 0.0145,
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.Medium,
    },
    mediaText: {
      color: theme.colors.MESSAGE_TEXT_COLOR,
      fontSize: dgl * 0.017,
      fontFamily: C.font.SemiBold,
      width: '100%',
      marginLeft: 5,
    },
    marginTop: {marginTop: 12},
    notesMainView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      elevation: 6,
      shadowColor: '#ededed',
      marginVertical: 5,
      shadowRadius: 10,
      borderRadius: 10,
      minHeight: 40,
      shadowOpacity: 0.5,
      width: '99%',
      alignSelf: 'center',
      padding: 10,
      shadowOffset: {width: 0, height: 2},
    },
    noteSection: {
      flexDirection: 'row',
      marginTop: 25,
      justifyContent: 'space-between',
    },
    noteSectionView: {flex: 1, marginTop: 10, marginLeft: 10, marginRight: 15},
    paddingTop: {paddingTop: Platform.OS === 'android' ? '16%' : '33%'},
    paramText: {
      marginTop: 40,
      color: theme.colors.MESSAGE_TEXT_COLOR,
      fontSize: dgl * 0.017,
      marginLeft: 10,
      marginBottom: -3,
      fontFamily: C.font.SemiBold,
    },
    paramView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    qualificationMainView: {
      maxWidth: dgl / 2.5,
      alignSelf: 'center',
      paddingHorizontal: dgl * 0.003,
      marginTop: 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    qualificationText: {
      marginRight: 10,
      color: theme.colors.MESSAGE_TEXT_COLOR,
      fontSize: dgl * 0.015,
    },
    qualificationView: {
      margin: 4,
      paddingHorizontal: 10,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
    },
    rowView: {
      alignItems: 'center',
      backgroundColor: theme.colors.TEXT_COLOR,
      flexDirection: 'row',
      paddingTop: Platform.OS === 'ios' ? dgl * 0.05 : dgl * 0.014,
      width: '100%',
      justifyContent: 'space-between',
      paddingVertical: dgl * 0.016,
      paddingHorizontal: dgl * 0.012,
    },
    saveBtn: {color: theme.colors.BACKGROUND, fontSize: dgl * 0.013},
    status: {
      backgroundColor: theme.colors.V_LIGHT_GREEN,
      alignSelf: 'center',
      textAlign: 'center',
      padding: dgl * 0.003,
      fontSize: dgl * 0.01,
      borderRadius: dgl * 0.08,
      paddingHorizontal: dgl * 0.014,
      color: theme.colors.STATUS_BG_COLOR,
      marginTop: dgl * 0.007,
      fontFamily: C.font.Bold,
    },
    textInputView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '52%',
      backgroundColor: theme.colors.LIGHT_BG,
      marginRight: 10,
      paddingRight: 10,
      borderRadius: 6,
    },
    userName: {
      fontSize: dgl * 0.024,
      color: theme.colors.GRAY_DARK,
      textAlign: 'center',
      paddingTop: dgl * 0.008,
      letterSpacing: 0.5,
      fontFamily: C.font.SemiBold,
    },
    searchInput: {
      width: '100%',
      alignSelf: 'center',
    },
    editTrue: {
      backgroundColor: theme.colors.LIGHT_BG_BORDER,
    },
    sections: {width: '100%', marginHorizontal: 5},
    editFalse: {
      backgroundColor: theme.colors.LIGHT_BG,
    },
    rowDirection: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
    wrapperView: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    qualificationMainViewEditTrue: {
      borderWidth: 1,
      borderColor: theme.colors.TEXT_COLOR,
      width: dgl / 2.5,
    },
    qualificationMainViewEditFalse: {
      borderWidth: 0,
      borderColor: 'transparent',
      width: undefined,
    },
  });
  return {styles};
};

export default ContactInfoStyle;
