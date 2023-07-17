import {C} from '../../constants';
import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';

const ParameterStyles = (theme: any) => {
  const dgl = C.measures.dgl;
  const styles = StyleSheet.create({
    addBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 15,
      marginTop: 15,
    },
    addBtnInsideModal: {
      backgroundColor: theme.colors.TEXT_COLOR,
      padding: 12,
      borderRadius: 100,
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 4,
    },
    addBtnTextInsideModal: {
      color: '#fff',
      fontSize: dgl * 0.017,
      fontFamily: C.font.SemiBold,
    },
    addNewText: {
      marginLeft: 10,
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.018,
      textAlign: 'center',
      paddingTop: 3,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    contentContainerStyle: {marginTop: 12},
    headerMainView: {
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: dgl * 0.01,
    },
    headerTop: {paddingTop: Platform.OS === 'android' ? '15.5%' : '33%'},
    headerText: {
      color: '#fff',
      fontSize: dgl * 0.021,
      marginHorizontal: 10,
      fontFamily: C.font.Medium,
    },
    inputSectionView: {width: '90%', alignSelf: 'center'},
    inputText: {
      width: '70%',
      color: theme.colors.INPUT_TEXT_COLOR,
      padding: 4,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.015,
      marginLeft: 3,
    },
    labelText: {
      fontSize: dgl * 0.015,
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.Regular,
      width: '36%',
    },
    margin: {marginBottom: 15},
    paramView: {
      flexDirection: 'row',
      //   justifyContent: 'space-between',
      marginLeft: 15,
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 5,
    },
    textInputView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '52%',
      backgroundColor: '#F6F8FA',
      marginRight: 10,
      paddingRight: 10,
      borderRadius: 6,
      paddingVertical: 3,
    },
  });
  return {styles};
};

export default ParameterStyles;
