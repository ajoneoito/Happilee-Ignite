/**
 * Welcome to useNavigationUtils.ts
 * @module NavigationUtilsHook
 * @desc Utility functions for react-navigation library
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import {createNavigationContainerRef} from '@react-navigation/native';
import {CommonActions, useNavigationState} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, BackHandler, Platform} from 'react-native';
import i18next from 'i18next';

/**
 * Use on ref to get access on navigation container to various helper method.
 */
export const navigationRef = createNavigationContainerRef();

/**
 * Allows to navigate to a specific route.
 * @param {string} name A destination name of the route that has been registered somewhere.
 * @param {object} params Params to merge into the destination route
 */
// export const navigate = (name: string, params?: object) => {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// };
export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

/**
 * Returns active route name.
 */
export const getActiveRoute = () => {
  let currentRouteName = navigationRef.getCurrentRoute()?.name;
  return currentRouteName;
};

/**
 * Allows to go back to the previous route in history.
 */
export const goBack = () => {
  navigationRef.dispatch(CommonActions.goBack());
};

/**
 * Reset the navigation state to the given state.
 * @param {object} newState The new navigation state object to use.
 */
export const resetNavigation = (newState: object) => {
  try {
    navigationRef.dispatch(CommonActions.reset(newState));
  } catch (error) {}
};

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';
/**
 * Persist navigation state.
 * @async
 */
export const persistNavigationState = () => {
  const currentState = useNavigationState(state => state);
  AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(currentState));
};

/**
 * Allows to go back to the previous route
 * if there's any navigation history available in the current navigator,
 * else ask an app exit propmt.
 * (Android only)
 */
export const canGoBack = () => {
  if (Platform.OS !== 'ios') {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    } else {
      const {t} = i18next;

      Alert.alert(
        t('navigation:EXIT_ALERT_TITLE'),
        t('navigation:EXIT_ALERT_DESCRIPTION'),
        [
          {
            text: t('navigation:EXIT_ALERT_CANCEL'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: t('navigation:EXIT_ALERT_OK'),
            onPress: () => BackHandler.exitApp(),
          },
        ],
      );
    }
  }
};

/**
 * Allows user to exit from app
 */
export const exitApp = () => {
  const {t} = i18next;
  Alert.alert(
    t('navigation:EXIT_ALERT_TITLE'),
    t('navigation:EXIT_ALERT_DESCRIPTION'),
    [
      {
        text: t('navigation:EXIT_ALERT_CANCEL'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: t('navigation:EXIT_ALERT_OK'),
        onPress: () => BackHandler.exitApp(),
      },
    ],
  );
};
