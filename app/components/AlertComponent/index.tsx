/**
 * AlertComponent.tsx
 * @module Alert Component
 * @desc Component for showing alerts to uses in different situations.
 * @author Open Source.
 * @see https://www.npmjs.com/package/react-native-alert-notification
 * @version 0.3.4
 * @access public
 * ...
 */

import {ALERT_TYPE} from './config/ENV';
import {Dialog, IConfigDialog, IConfigToast, Root} from './containers';
import {Toast} from './containers';

export {Dialog, Toast, Root};
export {
  Dialog as AlertNotificationDialog,
  Toast as AlertNotificationToast,
  Root as AlertNotificationRoot,
  ALERT_TYPE,
};
export type {IConfigDialog, IConfigToast};

export default {Dialog, Toast, Root, ALERT_TYPE};
