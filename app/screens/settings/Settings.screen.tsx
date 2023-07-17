/**
 * Settings.Screen.tsx
 * @module Settings screen
 * @desc Screen for Settings.
 * @author Jose NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import {Text, View} from 'react-native';
import {settingsStyle} from './Settings.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {useTranslation} from 'react-i18next';
import ThemeSwitch from '../../utils/theming/themeSwitch';
import FontScaler from '../../utils/theming/fontScaler';
import Translation from '../../utils/translations/translation';
import Header from '../../components/Header/Header.componenet';

const SettingsScreen = () => {
  // Theme switching,access the currently active theme
  const style = useThemedStyles(settingsStyle);
  const {t} = useTranslation();

  return (
    <>
      <Header arrow title={'Settings'} />
      <View style={style.container}>
        <View style={style.settingsItem}>
          <Translation />
        </View>
        <View style={style.settingsItem}>
          <ThemeSwitch />
        </View>
        <View style={style.settingsItem}>
          <Text style={style.settingsItemText}>
            {t('settings:CHANGE_FONT_SCALE')}
          </Text>
          <View style={style.settingsSelectValue}>
            <FontScaler />
          </View>
        </View>
      </View>
    </>
  );
};

export default SettingsScreen;
