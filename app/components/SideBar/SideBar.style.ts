/**
 * Sidebar.style.ts
 * @module Sidebar screen styles
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {StyleSheet} from 'react-native';
import {C} from '../../constants';
import {Platform} from 'react-native';
const dgl = C.measures.dgl;
export const SideBarStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    profileSection: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: dgl * 0.005,
      backgroundColor: theme.colors.BACKGROUND_DP,
      width: dgl * 0.0789,
      height: dgl * 0.0789,
      borderRadius: (dgl * 0.0789) / 2,
    },
    firstL: {
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.045,
      alignSelf: 'center',
    },
    profileContainer: {
      flex: 1,
      backgroundColor: theme.colors.PROFILE_BG,
      padding: dgl * 0.03,
    },
    profile: {
      flexDirection: 'row',
      paddingTop: 10,
    },
    name: {
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.023,
      paddingTop: dgl * 0.02,
    },
    email: {
      color: theme.colors.GRAY_LIHGT,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.014,
      paddingBottom: dgl * 0.0015,
    },
    paddingTop: {paddingTop: Platform.OS === 'android' ? '15%' : '45%'},
    project: {},
    projectName: {
      color: theme.colors.LIGHT_BLUE,
      fontSize: dgl * 0.011,
      backgroundColor: theme.colors.BACKGROUND_DP,
      paddingHorizontal: dgl * 0.008,
      paddingVertical: dgl * 0.0027,
      borderRadius: 4,
      fontFamily: C.font.Medium,
    },
    wrap: {
      flex: 3.05,
    },
    sidebarItems: {
      flexDirection: 'row',
      marginVertical: dgl * 0.015,
      paddingHorizontal: dgl * 0.03,
    },
    contentContainer: {
      paddingTop: dgl * 0.01,
    },
    label: {
      paddingHorizontal: dgl * 0.019,
      color: theme.colors.GRAY_DARK,
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.015,
    },
    singleLine: {
      width: '90%',
      borderWidth: 0.45,
      alignSelf: 'center',
      marginVertical: dgl * 0.01,
      borderColor: theme.colors.GRAY_LINE,
    },
  });
