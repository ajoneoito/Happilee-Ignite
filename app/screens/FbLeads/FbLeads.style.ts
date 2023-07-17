import {StyleSheet} from 'react-native';

/**
 * Fbleads.style.ts
 * @module leads screen styles
 * @desc  Styles to fbleads screen
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
const dgl = C.measures.dgl;
export const leadsStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    img: {
      width: dgl * 0.0288,
      height: dgl * 0.0288,
      borderRadius: (dgl * 0.034) / 2,
      alignSelf: 'center',
    },
    navTab: {
      paddingVertical: dgl * 0.01,
      borderColor: 'transparent',
      borderBottomWidth: 1.7,
      width: '33.33%',
      justifyContent: 'center',
      paddingLeft: dgl * 0.018,
    },
    detailsNavTab: {
      paddingVertical: dgl * 0.01,
      borderColor: 'transparent',
      borderBottomWidth: 1.7,
      width: '45%',
      justifyContent: 'center',
    },
    headerSection: {
      width: '100%',
      backgroundColor: theme.colors.TEXT_COLOR,
    },
    searchNave: {
      alignItems: 'center',
      width: '100%',
    },
    searchDetailsNav: {
      width: '75%',
      paddingHorizontal: dgl * 0.014,
    },
    detailsTitle: {
      alignSelf: 'center',
    },
    navTabHeader: {
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.015,
      color: theme.colors.BACKGROUND,
    },
    statusContainer: {
      paddingHorizontal: dgl * 0.013,
      paddingVertical: dgl * 0.004,
      borderRadius: dgl * 0.04,
      marginHorizontal: dgl * 0.006,
    },
    statusNav: {
      alignItems: 'center',
      paddingHorizontal: dgl * 0.0085,
      paddingVertical: dgl * 0.015,
    },
    statusTitle: {
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.013,
    },
    status: {
      width: '100%',
      backgroundColor: '#fff',
      height: dgl * 0.06,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffset: {width: 1.5, height: 1},
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
    },
    button: {
      alignContent: 'center',
      paddingVertical: 5,
      paddingHorizontal: dgl * 0.012,
      alignSelf: 'center',
      borderRadius: dgl * 0.03,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.015,
      fontFamily: C.font.SemiBold,
      alignSelf: 'center',
    },
    leadStatus: {
      marginLeft: dgl * 0.017,
    },
    details: {
      flexDirection: 'row',
      paddingVertical: dgl * 0.004,
      justifyContent: 'space-between',
    },
    leadDetailsContainer: {
      width: '91%',
      marginTop: 15,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: theme.colors.BORDER_GRAY,
      marginVertical: 5,
      alignSelf: 'center',
      borderRadius: 8,
      padding: 14,
    },
    wraper: {flexDirection: 'row'},
    leadName: {
      color: theme.colors.MESSAGE_TEXT_COLOR,
      fontSize: dgl * 0.016,
      fontFamily: C.font.Regular,
      width: '55%',
    },
    leadsStatus: {marginLeft: 'auto'},
    leadData: {
      color: theme.colors.GRAY_LIGHT,
      fontSize: dgl * 0.014,
      fontFamily: C.font.Medium,
      textAlign: 'right',
      width: dgl * 0.2,
    },
    data: {
      color: theme.colors.GRAY_LIGHT,
      fontSize: dgl * 0.014,
      fontFamily: C.font.Regular,
    },
    emptyText: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.0135,
      color: theme.colors.GRAY_DARK,
      marginTop: '25%',
      alignSelf: 'center',
    },
    basicInfo: {
      color: theme.colors.MESSAGE_TEXT_COLOR,
      fontSize: dgl * 0.017,
      fontFamily: C.font.SemiBold,
      paddingBottom: dgl * 0.007,
      paddingTop: dgl * 0.015,
    },
    leadHeaderSection: {
      flex: 1,
      paddingBottom: dgl * 0.015,
    },
    addInfo: {
      paddingTop: dgl * 0.025,
    },
    infoContainer: {
      width: '93%',
      borderWidth: 1,
      borderColor: theme.colors.BORDER_GRAY,
      alignSelf: 'center',
      paddingHorizontal: dgl * 0.0166,
      marginTop: dgl * 0.0141,
      borderRadius: 8,
      paddingBottom: dgl * 0.016,
    },
    add: {
      paddingTop: dgl * 0.008,
    },
    notes: {
      backgroundColor: '#F6F8FA',
      borderRadius: 4,
      paddingHorizontal: dgl * 0.012,
      marginVertical: dgl * 0.01,
      paddingVertical: dgl * 0.01,
    },
    Detailscontainer: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND,
    },
    timeZone: {
      flexDirection: 'row',
    },
    dot: {
      paddingHorizontal: dgl * 0.01,
      color: theme.colors.GRAYISH_LIGHT,
      fontSize: dgl * 0.004,
      paddingBottom: 5,
    },
    date: {
      color: theme.colors.GRAYISH_LIGHT,
      fontSize: dgl * 0.014,
      fontFamily: C.font.Regular,
    },
    history: {
      flexDirection: 'row',
      width: '90%',
      backgroundColor: '#fff',
      alignSelf: 'center',
      marginVertical: dgl * 0.007,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 1.68,
      elevation: 3,

      borderColor: '#E5E5E5',
      borderWidth: 1,
      borderRadius: 8,
      padding: dgl * 0.019,
    },
    historyContainer: {
      marginTop: dgl * 0.01,
    },
    statusName: {
      marginLeft: 'auto',
    },
    historyContentContainer: {},
    created_at: {
      color: theme.colors.MESSAGE_TEXT_COLOR,
      fontSize: dgl * 0.016,
      fontFamily: C.font.Regular,
      paddingHorizontal: dgl * 0.01,
    },
    statusButton: {
      paddingHorizontal: 8,
      borderRadius: 100,
      borderWidth: 1,
      backgroundColor: theme.colors.V_LIGHT_GREEN,
      marginLeft: dgl * 0.03,
      borderColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusLabel: {
      alignSelf: 'center',
      color: theme.colors.GREEN_LIGHT,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.014,
    },
    buttonContainer: {
      marginLeft: 'auto',
    },
    modal: {
      justifyContent: 'center',
      maxHeight: '100%',
      minHeight: '50%',
      backgroundColor: 'white',
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: dgl * 0.02,
    },
    modalContainer: {
      flex: 1,
      marginVertical: dgl * 0.02,
      paddingVertical: 6,
      paddingHorizontal: 1,
      backgroundColor: theme.colors.BACKGROUND,
      marginHorizontal: 1,
    },
    cancel: {marginLeft: 'auto'},
    madalHeaderText: {
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.019,
    },
    singleLine: {
      marginHorizontal: dgl * 0.02,
      borderWidth: 1,
      borderColor: theme.colors.BORDER_GRAY,
      marginVertical: dgl * 0.015,
    },
    modalContent: {
      flexDirection: 'row',
      marginHorizontal: dgl * 0.02,
    },
    animated: {
      position: 'absolute',
      right: dgl * 0.012,
      bottom: '10%',
      alignSelf: 'flex-end',
      width: dgl * 0.066,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 5,
    },
    roundBotton: {
      width: dgl * 0.06,
      height: dgl * 0.06,
      backgroundColor: theme.colors.BACKGROUND,
      justifyContent: 'center',
      borderRadius: 100,
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 7,
      elevation: 4,
      margin: dgl * 0.0055,
      shadowColor: 'rgba(0, 0, 0, 0.14)',
      shadowOpacity: 0.5,
      borderColor: '#DBDBDB',
      borderWidth: 0.13,
    },
    animationStyle: {
      position: 'absolute',
      right: dgl * 0.001,
      bottom: dgl * -0.0169,
    },
    paramSub: {
      marginVertical: dgl * 0.008,
    },
    dialContainer: {
      width: '35%',
      borderRadius: dgl * 0.01,
      marginVertical: dgl * 0.008,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    dialCode: {
      fontFamily: C.font.Regular,
      color: theme.colors.PRIMARY,
      fontSize: dgl * 0.016,
      alignSelf: 'center',
    },
    dropDown: {},
    statusDropDown: {
      position: 'absolute',
      marginTop: 5,
      paddingHorizontal: dgl * 0.018,
      color: 'red',
    },
    dropcontainer: {
      backgroundColor: 'red',
    },
    titleStyle: {
      paddingHorizontal: dgl * 0.01,
    },
    label: {
      paddingLeft: dgl * 0.003,
    },
    additionalInfoContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    delete: {
      marginLeft: 'auto',
    },
    addButtonView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 9,
      paddingLeft: dgl * 0.02,
      paddingBottom: 5,
    },
    addheading: {
      color: theme.colors.TEXT_COLOR,
      paddingLeft: dgl * 0.015,
    },
    heading: {
      color: theme.colors.TEXT_BLACK,
      fontSize: dgl * 0.019,
      fontFamily: C.font.SemiBold,
    },
    addField: {
      width: '100%',
      padding: dgl * 0.018,
      borderWidth: 1,
      borderColor: theme.colors.BORDER_GRAY,
      borderRadius: 6,
      marginVertical: dgl * 0.01,
    },
    RoundBtnConatiner: {
      height: dgl * 0.0555,
      width: dgl * 0.0555,
      alignSelf: 'center',
      bottom: 4,
      right: 0,
    },
    notesContainer: {
      borderWidth: 1,
      borderColor: theme.colors.BORDER_GRAY,
      borderRadius: 6,
      padding: dgl * 0.018,
    },
    field: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      justifyContent: 'center',
      backgroundColor: theme.colors.FIELD,
      color: theme.colors.PRIMARY,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.014,
      padding: 0,
      maxHeight: dgl * 0.2,
    },
    inputContainer: {
      width: '80%',
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: dgl * 0.016,
      paddingHorizontal: dgl * 0.016,
      backgroundColor: theme.colors.FIELD,
      justifyContent: 'center',
      borderColor: 'transparent',
    },

    containerTwo: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
    },
    buttonTex: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.017,
      fontFamily: C.font.SemiBold,
      alignSelf: 'center',
    },
    butto: {
      backgroundColor: theme.colors.TEXT_COLOR,
    },

    btnText1: {
      color: '#6A737D',
      fontSize: dgl * 0.0165,
      fontFamily: C.font.SemiBold,
    },
    btnText2: {
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.0165,
      fontFamily: C.font.SemiBold,
    },
    button1: {
      borderColor: '#012040',
      borderWidth: 0.8,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
      paddingVertical: 8,
    },
    button2: {
      borderColor: 'transparent',
      borderWidth: 0.8,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      width: '48%',
      paddingVertical: 8,
      backgroundColor: theme.colors.TEXT_COLOR,
    },

    buttonConatiner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: dgl * 0.02,
    },
    actionConatiner: {
      height: dgl * 0.063,
      width: dgl * 0.063,
      alignSelf: 'center',
      right: dgl * 0.012,
    },
    dateItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    svgStyle: {alignSelf: 'center'},
    modalStyle: {
      backgroundColor: '#fff',
      margin: 0,
      marginTop: 50,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    form: {
      width: '92%',
      alignSelf: 'center',
    },
    phone: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    followUp: {marginLeft: 'auto'},
    inputStyle: {width: '90%'},
    InputField: {maxHeight: 250},
    DateIcon: {marginLeft: 'auto'},
    fieldConatiner: {
      width: '80%',
      backgroundColor: '#fff',
      flexDirection: 'row',
    },
    LeadsinfoCont: {flex: 1},
    inputField:
      {width: '100%'},
      params:{paddingVertical: 6}
    
  });
