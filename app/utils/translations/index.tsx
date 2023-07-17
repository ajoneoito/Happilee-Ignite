/**
 * @author Jose
 * @version 0.0.1
 *
 */

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './languages/en';
import ml from './languages/ml';
import AsyncStorage from '@react-native-async-storage/async-storage';

// after importing new languages, u can add those names below here

const LANGUAGES = {
  en,
  ml,
};

const LANG_CODES = Object.keys(LANGUAGES); //fetching language codes like en, eu, ml etc

/**
 *i18n is configured in a very specific way. It will check the user's stored language preference when the app starts, and it will default to the next available language that you suggest if the user's language preference is not available through your app. As a result, you'll need to define a fallback language.
 **/
const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        if (err) {
        } else {
        }
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(LANG_CODES);
        callback(findBestAvailableLanguage.languageTag || 'en');
        return;
      }
      callback(language);
    });
    const findBestAvailableLanguage =
      RNLocalize.findBestAvailableLanguage(LANG_CODES);
    callback(findBestAvailableLanguage.languageTag || 'en');
  },
  init: () => {},
  cacheUserLanguage: language => {
    AsyncStorage.setItem('user-language', language);
  },
};

i18next
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
