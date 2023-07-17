import {I18n} from 'i18n-js';
import RNRestart from 'react-native-restart';
import {en} from './en';
import {fr} from './fr';

/**
 * Create a new I18n object
 */
const i18n = new I18n();

/**
 * Adding languages
 */
i18n.translations = {fr, en};

/**
 * The utility function for Multi language compatible text
 * @param key the string id for currosponding text
 * @returns string
 */
export const translate = (key: string) => {
  return i18n.t(key);
};

/**
 * Function for change language locale
 * @param languagecode the two charecter string that represent language
 */
export const changeLanguage = (languagecode: 'fr' | 'en') => {
  i18n.locale = languagecode;
  RNRestart.Restart();
};
