/**
 * MediaAndDocStyles.style.ts
 * @module Media and documentation styles
 * @desc style to Media and documentation screen
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {StyleSheet} from 'react-native';
import {C} from '../../constants';
import {Platform} from 'react-native';
import measures from '../../constants/measures';

const MediaAndDocStyles = (theme: any) => {
  const dgl = C.measures.dgl;
  const styles = StyleSheet.create({
    animatedView: {
      backgroundColor: '#040921',
      flex: 1,
      justifyContent: 'center',
    },
    arrowPadding: {padding: 10},
    audioDownloadStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffcc00',
      opacity: 0.6,
    },
    audioFileView: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffcc00',
    },
    background: {
      backgroundColor: '#ededed',
    },
    chatDate: {
      color: '#CBDBE2',
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.012,
    },
    closeBtn: {
      backgroundColor: 'grey',
      position: 'absolute',
      top: Platform.OS === 'android' ? 10 : 60,
      left: 10,
      zIndex: 1,
      padding: 4,
      borderRadius: 100,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    contentContainerStyleFlatList: {
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 15,
    },
    doumentInnerView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 7,
      // justifyContent: 'space-between',
    },
    documentMainView: {
      width: '100%',
      paddingTop: 15,
    },
    documentName: {
      fontSize: dgl * 0.018,
      letterSpacing: 0.1,
      color: '#000',
      fontFamily: C.font.Regular,
      maxWidth: '80%',
    },
    documentSeperatorLine: {
      borderBottomColor: '#CBDBE2',
      borderBottomWidth: 1,
      paddingVertical: 10,
      width: '95%',
      alignSelf: 'center',
    },
    documentTextView: {marginHorizontal: 10, width: '75%'},
    documentTime: {
      fontSize: dgl * 0.015,
      letterSpacing: 0.1,
      color: '#5F5F5F',
      fontFamily: C.font.Regular,
      width: '95%',
    },
    durationTextStyle: {color: '#fff', marginLeft: 5},
    durationTextStyle2: {
      position: 'absolute',
      bottom: 5,
      left: 10,
      color: '#fff',
    },
    durationView: {
      position: 'absolute',
      bottom: 5,
      left: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    flex: {flex: 1},
    forwardView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
    },
    headerMainView: {
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: dgl * 0.01,
    },
    headerText: {
      color: '#fff',
      fontSize: dgl * 0.021,
      marginHorizontal: 10,
      fontFamily: C.font.Medium,
    },
    imageEnlargeAnimatedStyles: {
      position: 'absolute',
      top: Platform.OS === 'android' ? 10 : measures.barHeight + 10,
      left: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Platform.OS === 'android' ? '88%' : '85%',
      zIndex: 10,
    },
    imageEnlargeAnimatedStylesWidth: {
      width: Platform.OS === 'android' ? '78%' : '75%',
    },
    imageEnlargeStyle: {
      width: C.measures.windowWidth,
      height: C.measures.windowHeight / 1.5,
    },
    margin: {
      marginTop: 10,
      paddingBottom: 20,
    },
    margin2: {marginRight: 15},
    topNavigationBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    selectedTextStyle: {
      color: '#fff',
      fontSize: dgl * 0.018,
      fontFamily: C.font.SemiBold,
    },
    defaultTextStyle: {
      color: '#CBDBE2',
      fontSize: dgl * 0.018,
      fontFamily: C.font.SemiBold,
      opacity: 0.5,
    },
    defaultdBtnStyle: {
      borderBottomColor: '#fff',
      borderBottomWidth: 0,
      paddingHorizontal: 30,
    },
    downloadIconIndicator: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    top: {top: 45},
    headerTop: {paddingTop: Platform.OS === 'android' ? '15.5%' : '33%'},
    pdfStyle: {
      flex: 1,
      width: C.measures.windowWidth,
      height: C.measures.windowHeight,
    },
    rowDirection: {flexDirection: 'row', alignItems: 'center'},
    selectedBtnStyle: {
      borderBottomColor: '#fff',
      borderBottomWidth: 1.5,
      paddingHorizontal: 30,
    },
    senderNameView: {
      marginHorizontal: 10,
      width: '80%',
    },
    senderText: {
      color: '#fff',
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.018,
    },
    commonFileView: {
      width: 120,
      height: 120,
      borderRadius: 15,
      margin: 5,
      elevation: 5,
    },
    videoFileView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    videoPlayer: {height: 0, width: 0},
    zindex1: {zIndex: 10},
    zindex2: {zIndex: 0},
  });
  return {styles};
};

export default MediaAndDocStyles;
