import {C} from '../../constants';
import {Platform, StyleSheet} from 'react-native';

const dgl = C.measures.dgl;
export const PlayerStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.TEXT_COLOR,
      position: 'absolute',
      height: '7%',
      paddingVertical: 5,
      top: Platform.OS === 'ios' ? 50 : 0,
    },
    headset: {
      color: theme.colors.TEXT_COLOR,
    },
    nameText: {
      color: '#fff',
      maxWidth: '60%',
      fontSize: dgl * 0.016,
    },
    subContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    profileView: {
      width: 30,
      height: 30,
      backgroundColor: theme.colors.CHAT_LIST_BG,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sliderStyle: {
      width: '108%',
      marginLeft: -15,
      marginVertical: 2,
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    timeText: {
      color: '#fff',
      fontSize: dgl * 0.012,
      marginLeft: -dgl * 0.042,
      marginRight: 10,
    },
    padding: {paddingVertical: 10},
    videoPlayer: {height: 0, width: 0},
  });
