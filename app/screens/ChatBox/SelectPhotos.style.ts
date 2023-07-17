import {Platform, StyleSheet} from 'react-native';
import {C} from '../../constants';
import measures from '../../constants/measures';

const dgl = C.measures.dgl;
export const SelectPhotosStyle = (theme: any) =>
  StyleSheet.create({
    btn: {alignSelf: 'flex-end', marginBottom: 5},
    container: {backgroundColor: '#040921', flex: 1},
    closeBtn: {
      zIndex: 1,
      padding: 4,
      borderRadius: 100,
    },
    headerView: {
      flexDirection: 'row',
      paddingTop: Platform.OS === 'ios' ? dgl * 0.06 : dgl * 0.014,
      marginHorizontal: dgl * 0.01,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flatlistView: {alignSelf: 'center', flex: 1, justifyContent: 'center'},
    image: {
      width: measures.windowWidth,
      flex: 1,
      resizeMode: 'cover',
    },
    flatListInnerView: {flex: 1, marginVertical: 10},
    flatlist: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    smallImage: {
      width: dgl * 0.07,
      height: dgl * 0.07,
      borderRadius: 10,
      margin: 2,
      borderWidth: 2,
    },
    animatedView: {
      backgroundColor: '#040921',
      flex: 1,
      justifyContent: 'center',
    },
    inputStyle: {
      fontFamily: C.font.Regular,
      color: theme.colors.GRAY_LIHGT,
      fontSize: dgl * 0.018,
      width: C.measures.windowWidth / 1.5,
      marginLeft: -dgl * 0.015,
      marginBottom: Platform.OS === 'ios' ? 10 : 0,
    },
    sendIcon: {
      marginHorizontal: dgl * 0.006,
      marginBottom: Platform.OS === 'ios' ? dgl * 0.007 : dgl * 0.01,
    },
    captionView: {
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: Platform.OS === 'ios' ? 10 : 0,
      maxHeight: '35%',
    },
    inputText: {
      backgroundColor: theme.colors.LIGHT_BG,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginHorizontal: dgl * 0.013,
      marginBottom: dgl * 0.012,
      borderRadius: 30,
      width: C.measures.windowWidth / 1.05,
      minHeight: Platform.OS === 'ios' ? dgl * 0.05 : undefined,
    },
  });
