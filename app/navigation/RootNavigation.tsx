import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {routeEnum} from '../enums/route.enum';
import {
  LazyEntryScreen,
  LazyLoginScreen,
  LazyOTPScreen,
  LazyHomeScreen,
  LazyChatScreen,
  LazyProfileInfoScreen,
  LazyTemplateScreen,
  LazyTemplateParamScreen,
  LazySettingsScreen,
  LazyAddContactScreen,
  LazySelectContactScreen,
  LazyContactInfoScreen,
  LazyProjectSwitchingScreen,
  LazyInitialProjectScreen,
  LazyNewChatScreen,
  LazySelectPhotoScreen,
  LazyNewBroadcastScreen,
  LazyBroadcastLogScreen,
  LazyAddonsScreen,
  LazyFbLeadsScreen,
  LazyFbLeadDetailsScreen,
  LazyFbLeadProfileScreen,
  LazyMediaAndDocScreen,
  LazyParameterScreen,
  LazyNoteScreen,
  // LazyFbLeadsScreen,
  // LazyFbLeadDetailsScreen,
  // LazyFbLeadLogScreen,
  // LazyFbLeadProfileScreen,
} from './screens';
import {navigationRef} from './useNavigationUtils';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/root.reducer';
import {connectToCentrifuge} from '../services/api/authRequests';
import {Dimensions, Easing, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideBar from '../components/SideBar/SideBar.component';
import AddonsScreen from '../screens/addons/Addons.screen';

const RootStack = createStackNavigator();
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  },
};

const customTransition = {
  headerShown: false,
  transitionSpec: {
    open: TransitionSpecs.BottomSheetSlideInSpec,
    close: closeConfig,
  },
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '0deg'],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
      opacity: current.opacity,
    };
  },
};

const Drawer = createDrawerNavigator();
const windowWidth = Dimensions.get('window').width / 2;

const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={routeEnum.ENTRYSCREEN}
        screenOptions={{...customTransition}}>
        <RootStack.Screen
          name={routeEnum.ENTRYSCREEN}
          component={LazyEntryScreen}
        />
        <RootStack.Screen
          name={routeEnum.LOGINSCREEN}
          component={LazyLoginScreen}
        />
        <RootStack.Screen
          name={routeEnum.OTPSCREEN}
          component={LazyOTPScreen}
        />
        <RootStack.Screen
          name={routeEnum.PROFILEINFOSCREEN}
          component={LazyProfileInfoScreen}
        />
        <RootStack.Screen
          name={routeEnum.PROJECTSTACKSCREEN}
          component={ProjectStack}
        />
        <RootStack.Screen
          name={routeEnum.LOGGEDSCREENS}
          component={DrawerNavigation}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

//Screens access after user login
const LogedScreen = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      auth.channelId && connectToCentrifuge(dispatch);
    } catch (error) {}
  }, [auth.channelId]);
  try {
    return (
      <RootStack.Navigator
        initialRouteName={routeEnum.HOMESCREEN}
        screenOptions={{...customTransition}}>
        <RootStack.Screen
          name={routeEnum.HOMESCREEN}
          component={LazyHomeScreen}
        />
        <RootStack.Screen name={routeEnum.CHATBOX} component={LazyChatScreen} />
        <RootStack.Screen
          name={routeEnum.TEMPLATESCREEN}
          component={LazyTemplateScreen}
        />
        <RootStack.Screen
          name={routeEnum.TEMPLATEPARAMSCREEN}
          component={LazyTemplateParamScreen}
        />
        <RootStack.Screen
          name={routeEnum.SETTINGSSCREEN}
          component={LazySettingsScreen}
        />
        <RootStack.Screen
          name={routeEnum.ADDCONTACTSCREEN}
          component={LazyAddContactScreen}
        />
        <RootStack.Screen
          name={routeEnum.SELECTCONTACT}
          component={LazySelectContactScreen}
        />
        <RootStack.Screen
          name={routeEnum.CONTACTINFOMAINSCREEN}
          component={LazyContactInfoScreen}
        />
        <RootStack.Screen
          name={routeEnum.PROJECTSWITCHINGSCREEN}
          component={LazyProjectSwitchingScreen}
        />
        <RootStack.Screen
          name={routeEnum.NEWCHATSCREEN}
          component={LazyNewChatScreen}
        />
        <RootStack.Screen
          name={routeEnum.SELECTPHOTOSCREEN}
          component={LazySelectPhotoScreen}
        />
        <RootStack.Screen
          name={routeEnum.NEWBROADCASTSCREEN}
          component={LazyNewBroadcastScreen}
        />
        <RootStack.Screen
          name={routeEnum.BROADCASTLOGSCREEN}
          component={LazyBroadcastLogScreen}
        />
        <RootStack.Screen
          name={routeEnum.FBLEADPROFILESCREEN}
          component={LazyFbLeadProfileScreen}
        />
        <RootStack.Screen
          name={routeEnum.MEDIALISTSCREEN}
          component={LazyMediaAndDocScreen}
        />
        <RootStack.Screen
          name={routeEnum.PARAMETERSCREEN}
          component={LazyParameterScreen}
        />
        <RootStack.Screen
          name={routeEnum.NOTESECTIONSCREEN}
          component={LazyNoteScreen}
        />
      </RootStack.Navigator>
    );
  } catch (error) {
    return <View />;
  }
};

const ProjectStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName={routeEnum.PROJECTSCREEN}
      screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name={routeEnum.PROJECTSCREEN}
        component={LazyInitialProjectScreen}
      />
    </RootStack.Navigator>
  );
};
const FbLeadsStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName={routeEnum.FBLEADSSCREEN}
      screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name={routeEnum.FBLEADSSCREEN}
        component={LazyFbLeadsScreen}
      />
      <RootStack.Screen
        name={routeEnum.FBLEADSDETAILSSCREEN}
        component={LazyFbLeadDetailsScreen}
      />
    </RootStack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      hideStatusBar
      screenOptions={{
        drawerStyle: {
          width: windowWidth * 1.62,
          // height: '100%',
          // zIndex:10,
        },
      }}
      drawerContent={props => <SideBar />}
      initialRouteName="DrawerNavigation">
      <Drawer.Screen
        name="DrawerNavigation"
        component={LogedScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name={routeEnum.ADDONSSCREEN}
        component={LazyAddonsScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="FbLeadsStack"
        component={FbLeadsStack}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default RootNavigation;
