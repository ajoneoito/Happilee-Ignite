/**
 * Sidebar.component.tsx
 * @module SideBar Component
 * @desc Side bar to navigate and provide quick access.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import {ProfileEdit} from '../../assets';
import {SideBarStyle} from './SideBar.style';
import {routeEnum} from '../../enums/route.enum';
import {useDispatch, useSelector} from 'react-redux';
import {getUniqueId} from 'react-native-device-info';
import {buttons} from '../../constants/filterOptions';
import {toUpper} from '../../utils/functions/funtions';
import {RootState} from '../../redux/store/root.reducer';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {SPINNER_ACTION} from '../../redux/actions/spinner.action';
import {USER_LOGOUT_ACTION} from '../../redux/actions/auth.action';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {navigate, resetNavigation} from '../../navigation/useNavigationUtils';
export interface sidebarItems {
  label: string;
  svg: any;
}
const SideBar = () => {
  const dispatch = useDispatch();
  const style = useThemedStyles(SideBarStyle);

  const user = useSelector((state: RootState) => state.auth);
  const ProjectName = useSelector((state: RootState) => state.auth);
  const AudioPlayer = useSelector((state: RootState) => state.audioPlayer);
  // navigate to the particular screen.
  const onClickProfile = (item: sidebarItems) => {
    if (item.label === 'Messages') {
      resetNavigation({
        index: 1,
        routes: [{name: routeEnum.LOGGEDSCREENS}],
      });
    } else if (item.label === 'Add-ons') {
      navigate(routeEnum.ADDONSSCREEN);
    } else if (item.label === 'Projects') {
      navigate(routeEnum.PROJECTSWITCHINGSCREEN, {
        projectID: ProjectName.projectId,
        ProjectName: ProjectName.projectName,
      });
    } else if (item.label === 'Settings') {
      navigate(routeEnum.SETTINGSSCREEN);
    } else if (item.label === 'Logout') {
      Alert.alert('Logout!', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: async () => {
            localLogout();
          },
        },
      ]);
    }
  };
  // logout user
  const localLogout = async () => {
    dispatch({
      type: SPINNER_ACTION,
      payload: {
        spinning: true,
        title: 'Logout...',
        body: 'Please wait a moment',
      },
    });
    const device = await getUniqueId();
    dispatch({
      type: USER_LOGOUT_ACTION,
      payload: {
        device_id: device,
      },
    });
  };
  const renderItem = (item: sidebarItems) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => onClickProfile(item)}
          style={style.sidebarItems}>
          <item.svg />
          <Text style={style.label}>{item.label}</Text>
        </TouchableOpacity>
        {item.label === 'Settings' ? <View style={style.singleLine} /> : null}
      </>
    );
  };
  return (
    <View style={style.container}>
      <View
        style={[
          style.profileContainer,
          AudioPlayer?.isAudioPlaying === null ? undefined : style.paddingTop,
        ]}>
        <View style={style.profile}>
          <View style={style.profileSection}>
            <Text style={style.firstL}>
              {user.first_name.charAt(0)?.toUpperCase()}
            </Text>
          </View>
          <ProfileEdit
            onPress={() => {
              navigate(routeEnum.FBLEADPROFILESCREEN);
            }}
            style={{marginLeft: 'auto'}}
          />
        </View>
        <Text style={style.name}>
          {toUpper(user?.first_name)}{' '}
          {user?.last_name !== null ? toUpper(user?.last_name) : ''}
        </Text>
        <Text style={style.email}>{user.email}</Text>
        <View style={{alignItems: 'baseline'}}>
          <View style={style.project}>
            <Text style={style.projectName}>{user?.projectName}</Text>
          </View>
        </View>
      </View>
      <View style={style.wrap}>
        <FlatList
          contentContainerStyle={style.contentContainer}
          data={buttons}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default SideBar;
