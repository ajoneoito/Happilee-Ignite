import {
  Addon,
  Logout,
  Messages,
  ProfileEdit,
  Projects,
  SettingsIcon,
} from '../assets';

// Primary filter param options for chatlist.
const chatListPrimaryFilters = [
  {
    key: 'ALL',
    title: 'All Chats',
  },
  {
    key: 'LAST_24_HOURS',
    title: 'Last 24 Hours',
  },
  {key: 'OPEN', title: 'Open Chats'},
  {key: 'BLOCKED', title: 'Blocked'},
  {key: 'EXPIRED', title: 'Expired'},
];

// Secondary filter param options for chatlist.
const chatListSecondoryFilters = [
  {
    key: 'UNREPLIED',
    title: 'Unreplied',
    clickable: ['ALL', 'LAST_24_HOURS', 'OPEN'],
  },
  {key: 'UNREAD', title: 'Unread', clickable: ['ALL', 'LAST_24_HOURS', 'OPEN']},
  {key: 'SOLVED', title: 'Solved', clickable: ['ALL', 'LAST_24_HOURS']},
];

const filters = {
  chatlistPrimary: chatListPrimaryFilters,
  chatlistSecondary: chatListSecondoryFilters,
};
export const newBroadcastFilter = [
  {key: '1', title: 'Match All'},
  {key: '2', title: 'Match Any'},
];
export const broadcastMatchFilterParams = [
  {name: 'match', value: 'match'},
  {name: 'Does not match', value: 'unmatch'},
];
export const tab = [
  {key: '0', title: 'Success Recipients'},
  {key: '1', title: 'Failed Recipients'},
];
export const buttons = [
  {
    label: 'Messages',
    svg: Messages,
  },
  {
    label: 'Add-ons',
    svg: Addon,
  },
  {
    label: 'Projects',
    svg: Projects,
  },
  {
    label: 'Settings',
    svg: SettingsIcon,
  },
  {
    label: 'Logout',
    svg: Logout,
  },
];
export const addons = [
  {
    key: '1',
    label: 'fb leads',
    screen: 'FbLeadsStack',
  },
  {
    key: '2',
    label: '',
    screen: '',
  },
  {
    key: '3',
    label: '',
    screen: '',
  },
];
export const leadStates = [
  {key: 'status', title: 'LEADS'},
  {key: 'follow_up', title: 'FOLLOW UPS'},
  {key: '', title: 'COLD CALLING'},
];
export const leadDetailsNav = [
  {key: 'lead_details', title: 'LEAD DETAILS'},
  {key: 'history', title: 'HISTORY'},
];



export default filters;
