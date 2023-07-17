/**
 * Colors.ts
 * @file File manages the different color theme.
 * Store all color set related to diffrent theme here.
 * @author SAIFALI NeoITO
 * @copyright NeoITO
 */

const BG_LIGHT = '#ffffff';
const BG_DARK = '#DDDDDD';
const BG_GREEN = '#CCFFCC';
const BG_VIO = '#FFCCCC';
const PRIMARY_LIGHT = '#012040';
const FIELD_BG_LIHGT = '#F6F8FA';
const ERROR = '#DD5147';

const common = {
  BACKGROUND: BG_LIGHT,
  TEXT_COLOR: '#199CD9',
  TEXT_BLACK: '#696464',
  GRAY_LIHGT: '#6A737D',
  PRIMARY: PRIMARY_LIGHT,
  FIELD: FIELD_BG_LIHGT,
  ERROR: ERROR,
  LIGHT_BG: '#F6F8FA',
};

const light = {
  ...common,
  BACKGROUND: BG_LIGHT,
  TEXT_COLOR: '#199CD9',
  TEXT_BLACK: '#696464',
  GRAY_LIHGT: '#6A737D',
  PRIMARY: PRIMARY_LIGHT,
  FIELD: FIELD_BG_LIHGT,
  CHAT_LIST_BG: '#C8EAFC',
  FIRST_L: '#197DAB',
  GRAY_DARK: '#24292E',
  GRAY_LIGHT: '#6A737D',
  GREEN_LIGHT: '#428F5E',
  BLUE_LIGHT: '#005CC5',
  V_LIGHT_GREEN: '#E8F3EC',
  V_LIGHT_BLUE: '#DBEDFF',
  GRAY_BORDER: '#E1E4E8',
  DISABLE_COLOR: '#CBDBE2',
  LIGHT_BG: '#F6F8FA',
  LIGHT_BG_BORDER: '#E1E4E8',
  MESSAGE_TEXT_COLOR: '#012040',
  STATUS_PRIMARY_COLOR: '#1AC45C',
  STATUS_TEXT_COLOR: '#0366D6',
  MESSAGE_BG_COLOR: '#F1F8FF',
  BACKGROUND_DP: '#CAF0F8',
  INPUT_TEXT_COLOR: '#040921',
  STATUS_BG_COLOR: '#22863A',
  DELETE: '#C74940',
  GRAY: 'rgba(4, 9, 33, 0.04)',
  ASH: 'rgba(4, 9, 33, 0.24)',
  LIGHT_RED: '#FDF3F2',
  DARK_GRAYISH_BLUE: '#959DA5',
  PROFILE_BG: '#F1FAFF',
  LIGHT_BLUE: '#2E6CAA',
  GRAY_LINE: '#EDEDED',
  BORDER_GRAY: '#E5E5E5',
  GRAYISH_LIGHT: 'rgba(36, 41, 46, 0.5)',
  TEXT_BLACK_ : '#1A1A1A',
};

const dark = {
  ...common,
  BACKGROUND: BG_DARK,
  TEXT_COLOR: '#252525',
  GRAY_LIHGT: ' #D5CEA3',
  CHAT_LIST_BG: '#c2bcbc',
};

const greenish = {
  ...common,
  BACKGROUND: BG_GREEN,
  TEXT_COLOR: '#006600',
  GRAY_LIHGT: '#A4BE7B',
  FIELD: '#F5FFF5',
};

const vio = {
  ...common,
  BACKGROUND: BG_VIO,
  TEXT_COLOR: '#b38f8f',
  GRAY_LIHGT: '#fff2f2',
  CHAT_LIST_BG: '#fff2f2',
};

export const colors = {
  light: light,
  dark: dark,
  greenish: greenish,
  vio: vio,
};
