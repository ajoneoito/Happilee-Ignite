import {lazy} from 'react';
import {FallBackUi, withIconSuspense} from '../utils/LazyLoaders/LazyIcons';

// * Svg Images
const Icon = withIconSuspense(
  lazy(() => import('./images/svg/icon.svg')),
  FallBackUi,
);
const Mascot = withIconSuspense(
  lazy(() => import('./images/svg/mascot.svg')),
  FallBackUi,
);
const DownArrow = withIconSuspense(
  lazy(() => import('./images/svg/vector.svg')),
  FallBackUi,
);

const ArrowDown = withIconSuspense(
  lazy(() => import('./images/svg/arrowDown.svg')),
  FallBackUi,
);
const UpArrow = withIconSuspense(
  lazy(() => import('./images/svg/upArrow.svg')),
  FallBackUi,
);
const LeftArrow = withIconSuspense(
  lazy(() => import('./images/svg/leftArrow.svg')),
  FallBackUi,
);
const GifIcon = withIconSuspense(
  lazy(() => import('./images/svg/gifIcon.svg')),
  FallBackUi,
);
const ClockIcon = withIconSuspense(
  lazy(() => import('./images/svg/clockIcon.svg')),
  FallBackUi,
);
const VerticalDots = withIconSuspense(
  lazy(() => import('./images/svg/verticalDots.svg')),
  FallBackUi,
);
const SendIcon = withIconSuspense(
  lazy(() => import('./images/svg/sendIcon.svg')),
  FallBackUi,
);
const ClipIcon = withIconSuspense(
  lazy(() => import('./images/svg/clipIcon.svg')),
  FallBackUi,
);
const UserIcon = withIconSuspense(
  lazy(() => import('./images/svg/userIcon.svg')),
  FallBackUi,
);
const DoubleTick = withIconSuspense(
  lazy(() => import('./images/svg/doubletick.svg')),
  FallBackUi,
);
const BackgroundImage = withIconSuspense(
  lazy(() => import('./images/svg/background.svg')),
  FallBackUi,
);
const SearchIcon = withIconSuspense(
  lazy(() => import('./images/svg/search.svg')),
  FallBackUi,
);
const MediaIcon = withIconSuspense(
  lazy(() => import('./images/svg/media.svg')),
  FallBackUi,
);
const LabelIcon = withIconSuspense(
  lazy(() => import('./images/svg/label.svg')),
  FallBackUi,
);
const AgentIcon = withIconSuspense(
  lazy(() => import('./images/svg/agent.svg')),
  FallBackUi,
);
const MuteIcon = withIconSuspense(
  lazy(() => import('./images/svg/mute.svg')),
  FallBackUi,
);
const BlockIcon = withIconSuspense(
  lazy(() => import('./images/svg/block.svg')),
  FallBackUi,
);
const ReportIcon = withIconSuspense(
  lazy(() => import('./images/svg/report.svg')),
  FallBackUi,
);
// * Lottie Animations
const HeaderArrow = withIconSuspense(
  lazy(() => import('./images/svg/arrow.svg')),
  FallBackUi,
);
const WhiteIcon = withIconSuspense(
  lazy(() => import('./images/svg/iconwhite.svg')),
  FallBackUi,
);
const Happilee = withIconSuspense(
  lazy(() => import('./images/svg/happilee.svg')),
  FallBackUi,
);
const Search = withIconSuspense(
  lazy(() => import('./images/svg/search.svg')),
  FallBackUi,
);
const Filter = withIconSuspense(
  lazy(() => import('./images/svg/filter.svg')),
  FallBackUi,
);
const Menu = withIconSuspense(
  lazy(() => import('./images/svg/menu.svg')),
  FallBackUi,
);
const PenIcon = withIconSuspense(
  lazy(() => import('./images/svg/pen.svg')),
  FallBackUi,
);
const Arrow = withIconSuspense(
  lazy(() => import('./images/svg/arrow_down.svg')),
  FallBackUi,
);
const Edit = withIconSuspense(
  lazy(() => import('./images/svg/edit.svg')),
  FallBackUi,
);
const RightArrow = withIconSuspense(
  lazy(() => import('./images/svg/right.svg')),
  FallBackUi,
);
// * Lottie Animations
// const PlaceholderLottie = require('./animations/robot.json');

const MenuSearch = withIconSuspense(
  lazy(() => import('./images/svg/menuSearch.svg')),
);

const DeleteIcon = withIconSuspense(
  lazy(() => import('./images/svg/deleteIcon.svg')),
  FallBackUi,
);

const AddIcon = withIconSuspense(
  lazy(() => import('./images/svg/addIcon.svg')),
  FallBackUi,
);

const AddContactIcon = withIconSuspense(
  lazy(() => import('./images/svg/addContact.svg')),
  FallBackUi,
);

const BlackPenIcon = withIconSuspense(
  lazy(() => import('./images/svg/blackPenIcon.svg')),
  FallBackUi,
);

const WhiteTickIcon = withIconSuspense(
  lazy(() => import('./images/svg/whiteTickIcon.svg')),
  FallBackUi,
);
const GreyCloseIcon = withIconSuspense(
  lazy(() => import('./images/svg/greyClose.svg')),
  FallBackUi,
);
const CirclePlus = withIconSuspense(
  lazy(() => import('./images/svg/circlePlus.svg')),
  FallBackUi,
);
const BlackCloseIcon = withIconSuspense(
  lazy(() => import('./images/svg/blackClose.svg')),
  FallBackUi,
);
const SimpleDownArrow = withIconSuspense(
  lazy(() => import('./images/svg/simpleArrowDown.svg')),
  FallBackUi,
);
const Delete = withIconSuspense(
  lazy(() => import('./images/svg/delete.svg')),
  FallBackUi,
);
const SpamIcon = withIconSuspense(
  lazy(() => import('./images/svg/spamIcon.svg')),
  FallBackUi,
);
const Project = withIconSuspense(
  lazy(() => import('./images/svg/project.svg')),
  FallBackUi,
);

const SwitchProject = withIconSuspense(
  lazy(() => import('./images/svg/switchProject.svg')),
  FallBackUi,
);

const SettingsIcon = withIconSuspense(
  lazy(() => import('./images/svg/settingsIcon.svg')),
  FallBackUi,
);

const LogoutIcon = withIconSuspense(
  lazy(() => import('./images/svg/logoutIcon.svg')),
  FallBackUi,
);

const CameraIcon = withIconSuspense(
  lazy(() => import('./images/svg/camera.svg')),
  FallBackUi,
);

const GalleryIcon = withIconSuspense(
  lazy(() => import('./images/svg/gallery.svg')),
  FallBackUi,
);

const DocumentIcon = withIconSuspense(
  lazy(() => import('./images/svg/document.svg')),
  FallBackUi,
);

const CloseIcon = withIconSuspense(
  lazy(() => import('./images/svg/closeIcon.svg')),
  FallBackUi,
);

const DeleteWhiteIcon = withIconSuspense(
  lazy(() => import('./images/svg/deleteWhiteIcon.svg')),
  FallBackUi,
);

const PdfIcon = withIconSuspense(
  lazy(() => import('./images/svg/pdfIcon.svg')),
  FallBackUi,
);
const CallIcon = withIconSuspense(
  lazy(() => import('./images/svg/callImage.svg')),
  FallBackUi,
);

const SMSIcon = withIconSuspense(
  lazy(() => import('./images/svg/sms.svg')),
  FallBackUi,
);

const ForwardIcon = withIconSuspense(
  lazy(() => import('./images/svg/forwardIcon.svg')),
  FallBackUi,
);

const Broadcast = withIconSuspense(
  lazy(() => import('./images/svg/broadcast.svg')),
  FallBackUi,
);
const Csv = withIconSuspense(
  lazy(() => import('./images/svg/csv.svg')),
  FallBackUi,
);
const Failed = withIconSuspense(
  lazy(() => import('./images/svg/failed.svg')),
  FallBackUi,
);
const Success = withIconSuspense(
  lazy(() => import('./images/svg/success.svg')),
  FallBackUi,
);
const DoubleArrow = withIconSuspense(
  lazy(() => import('./images/svg/doubleArrow.svg')),
  FallBackUi,
);
const Cancel = withIconSuspense(
  lazy(() => import('./images/svg/cancel.svg')),
  FallBackUi,
);
const Selected = withIconSuspense(
  lazy(() => import('./images/svg/selected.svg')),
  FallBackUi,
);
const Add = withIconSuspense(
  lazy(() => import('./images/svg/add.svg')),
  FallBackUi,
);
const CancelIcon = withIconSuspense(
  lazy(() => import('./images/svg/cancelIcon.svg')),
  FallBackUi,
);
const Upload = withIconSuspense(
  lazy(() => import('./images/svg/upload.svg')),
  FallBackUi,
);
const Cross = withIconSuspense(
  lazy(() => import('./images/svg/cancelIcon.svg')),
  FallBackUi,
);
const AddImages = withIconSuspense(
  lazy(() => import('./images/svg/addImages.svg')),
  FallBackUi,
);
const ModalCloseIcon = withIconSuspense(
  lazy(() => import('./images/svg/modalCloseIcon.svg')),
  FallBackUi,
);
const SmileImoji = withIconSuspense(
  lazy(() => import('./images/svg/emoji.svg')),
  FallBackUi,
);
const VoiceSendIcon = withIconSuspense(
  lazy(() => import('./images/svg/voiceSendIcon.svg')),
  FallBackUi,
);
const BotIcon = withIconSuspense(
  lazy(() => import('./images/svg/botIcon.svg')),
  FallBackUi,
);
const AudioDeleteIcon = withIconSuspense(
  lazy(() => import('./images/svg/audioDeleteIcon.svg')),
  FallBackUi,
);
const AudioPauseIcon = withIconSuspense(
  lazy(() => import('./images/svg/audioPauseIcon.svg')),
  FallBackUi,
);
const VoiceIcon = withIconSuspense(
  lazy(() => import('./images/svg/voiceIcon.svg')),
  FallBackUi,
);
const AudioPlayButton = withIconSuspense(
  lazy(() => import('./images/svg/audioPlayButton.svg')),
  FallBackUi,
);
const ProfileEdit = withIconSuspense(
  lazy(() => import('./images/svg/profileEdit.svg')),
  FallBackUi,
);
const Messages = withIconSuspense(
  lazy(() => import('./images/svg/email.svg')),
  FallBackUi,
);
const Logout = withIconSuspense(
  lazy(() => import('./images/svg/logout.svg')),
  FallBackUi,
);
const Addon = withIconSuspense(
  lazy(() => import('./images/svg/addOn.svg')),
  FallBackUi,
);
const Projects = withIconSuspense(
  lazy(() => import('./images/svg/projects.svg')),
  FallBackUi,
);
const Hamburger = withIconSuspense(
  lazy(() => import('./images/svg/hamburger.svg')),
  FallBackUi,
);
const DateIcon = withIconSuspense(
  lazy(() => import('./images/svg/date.svg')),
  FallBackUi,
);
const Action = withIconSuspense(
  lazy(() => import('./images/svg/action.svg')),
  FallBackUi,
);
const FormAction = withIconSuspense(
  lazy(() => import('./images/svg/formAction.svg')),
  FallBackUi,
);
const CallAction = withIconSuspense(
  lazy(() => import('./images/svg/callAction.svg')),
  FallBackUi,
);
const EmailAction = withIconSuspense(
  lazy(() => import('./images/svg/emailAction.svg')),
  FallBackUi,
);
const WhatsappAction = withIconSuspense(
  lazy(() => import('./images/svg/whatsappAction.svg')),
  FallBackUi,
);
const SmsAction = withIconSuspense(
  lazy(() => import('./images/svg/sms.svg')),
  FallBackUi,
);
const Left = withIconSuspense(
  lazy(() => import('./images/svg/leftArrw.svg')),
  FallBackUi,
);
const Right = withIconSuspense(
  lazy(() => import('./images/svg/rightArrow.svg')),
  FallBackUi,
);
const VerticalBlackDot = withIconSuspense(
  lazy(() => import('./images/svg/verticalBlackDot.svg')),
  FallBackUi,
);
// * Static Image files
// const Placeholderpng = require('./images/png/flower.png');

export {
  Right,
  Left,
  SmsAction,
  WhatsappAction,
  EmailAction,
  CallAction,
  FormAction,
  Action,
  DateIcon,
  Hamburger,
  Projects,
  Logout,
  Addon,
  Messages,
  ProfileEdit,
  Cross,
  Upload,
  CancelIcon,
  Add,
  Selected,
  Cancel,
  DoubleArrow,
  Csv,
  Failed,
  Success,
  Broadcast,
  LeftArrow,
  GifIcon,
  ClockIcon,
  VerticalDots,
  SendIcon,
  ClipIcon,
  UserIcon,
  ArrowDown,
  DoubleTick,
  BackgroundImage,
  UpArrow,
  SearchIcon,
  MediaIcon,
  LabelIcon,
  AgentIcon,
  MuteIcon,
  BlockIcon,
  ReportIcon,
  Icon,
  Mascot,
  DownArrow,
  HeaderArrow,
  WhiteIcon,
  Happilee,
  Search,
  Filter,
  Menu,
  PenIcon,
  MenuSearch,
  AddIcon,
  DeleteIcon,
  AddContactIcon,
  BlackPenIcon,
  WhiteTickIcon,
  GreyCloseIcon,
  CirclePlus,
  BlackCloseIcon,
  SimpleDownArrow,
  Delete,
  SpamIcon,
  Project,
  SwitchProject,
  SettingsIcon,
  LogoutIcon,
  Arrow,
  Edit,
  RightArrow,
  CameraIcon,
  GalleryIcon,
  DocumentIcon,
  CloseIcon,
  DeleteWhiteIcon,
  PdfIcon,
  CallIcon,
  SMSIcon,
  ForwardIcon,
  AddImages,
  ModalCloseIcon,
  SmileImoji,
  VoiceSendIcon,
  BotIcon,
  AudioDeleteIcon,
  AudioPauseIcon,
  VoiceIcon,
  AudioPlayButton,
  VerticalBlackDot,
};
