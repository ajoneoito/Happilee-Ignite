import {lazy} from 'react';
import {PageFallBackUi, withPageSuspense} from '../utils/LazyLoaders/LazyPage';

//entry screen
const LazyEntryScreen = withPageSuspense(
  lazy(() => import('../screens/entry/Entry.screen')),
  PageFallBackUi,
);
//Login screen
const LazyLoginScreen = withPageSuspense(
  lazy(() => import('../screens/authentication/Login.screen')),
  PageFallBackUi,
);
//OTP screen
const LazyOTPScreen = withPageSuspense(
  lazy(() => import('../screens/authentication/Otp.screen')),
  PageFallBackUi,
);
//Profile Info  screen
const LazyProfileInfoScreen = withPageSuspense(
  lazy(() => import('../screens/authentication/ProfileInfo.screen')),
  PageFallBackUi,
);
//Chat screen
const LazyHomeScreen = withPageSuspense(
  lazy(() => import('../screens/home/Home.screen')),
  PageFallBackUi,
);
//Template Screen
const LazyTemplateScreen = withPageSuspense(
  lazy(() => import('../screens/templates/Template.screen')),
  PageFallBackUi,
);
//Template parameters screen
const LazyTemplateParamScreen = withPageSuspense(
  lazy(() => import('../screens/templates/TemplateParams.screen')),
  PageFallBackUi,
);

const LazyChatScreen = withPageSuspense(
  lazy(() => import('../screens/ChatBox/ChatBox.screen')),
  PageFallBackUi,
);

//Settings screen
const LazySettingsScreen = withPageSuspense(
  lazy(() => import('../screens/settings/Settings.screen')),
  PageFallBackUi,
);

const LazyContactInfoScreen = withPageSuspense(
  lazy(() => import('../screens/ContactInfo/ContactInfoMain.screen')),
  PageFallBackUi,
);

//Project listing screen
const LazyInitialProjectScreen = withPageSuspense(
  lazy(() => import('../screens/projects/InitialProjects.screen')),
  PageFallBackUi,
);

const LazyProjectSwitchingScreen = withPageSuspense(
  lazy(() => import('../screens/projects/ProjectSwitching.screen')),
  PageFallBackUi,
);

//Select contact screen
const LazySelectContactScreen = withPageSuspense(
  lazy(() => import('../screens/newChat/SelectContact.screen')),
  PageFallBackUi,
);

const LazyAddContactScreen = withPageSuspense(
  lazy(() => import('../screens/newChat/AddContact.screen')),
  PageFallBackUi,
);
const LazyNewChatScreen = withPageSuspense(
  lazy(() => import('../screens/newChat/NewChat.screen')),
  PageFallBackUi,
);

const LazySelectPhotoScreen = withPageSuspense(
  lazy(() => import('../screens/ChatBox/SelectPhotos.screen')),
  PageFallBackUi,
);
// Broadcast screen
const LazyNewBroadcastScreen = withPageSuspense(
  lazy(() => import('../screens/broadcast/NewBroadcast.screen')),
  PageFallBackUi,
);
const LazyBroadcastLogScreen = withPageSuspense(
  lazy(() => import('../screens/broadcast/BroadcastLog.screen')),
  PageFallBackUi,
);
const LazyAddonsScreen = withPageSuspense(
  lazy(() => import('../screens/addons/Addons.screen')),
  PageFallBackUi,
);
const LazyFbLeadsScreen = withPageSuspense(
  lazy(() => import('../screens/FbLeads/FbLeadsList.screen')),
  PageFallBackUi,
);
const LazyFbLeadDetailsScreen = withPageSuspense(
  lazy(() => import('../screens/FbLeads/LeadDetails.screen')),
  PageFallBackUi,
);
const LazyFbLeadProfileScreen = withPageSuspense(
  lazy(() => import('../screens/FBleadProfileEdit/FBLeadsProfile.screen')),
  PageFallBackUi,
);
const LazyMediaAndDocScreen = withPageSuspense(
  lazy(() => import('../screens/ContactInfo/MediaAndDoc.screen')),
  PageFallBackUi,
);
const LazyParameterScreen = withPageSuspense(
  lazy(() => import('../screens/ContactInfo/Parameters.screen')),
  PageFallBackUi,
);
const LazyNoteScreen = withPageSuspense(
  lazy(() => import('../screens/ContactInfo/Notes.screen')),
  PageFallBackUi,
);
export {
  LazyFbLeadProfileScreen,
  LazyFbLeadDetailsScreen,
  LazyFbLeadsScreen,
  LazyAddonsScreen,
  LazyBroadcastLogScreen,
  LazyEntryScreen,
  LazyLoginScreen,
  LazyOTPScreen,
  LazyHomeScreen,
  LazyProfileInfoScreen,
  LazyChatScreen,
  LazySettingsScreen,
  LazyAddContactScreen,
  LazySelectContactScreen,
  LazyContactInfoScreen,
  LazyProjectSwitchingScreen,
  LazyInitialProjectScreen,
  LazyTemplateScreen,
  LazyTemplateParamScreen,
  LazyNewChatScreen,
  LazySelectPhotoScreen,
  LazyNewBroadcastScreen,
  LazyMediaAndDocScreen,
  LazyParameterScreen,
  LazyNoteScreen,
};
