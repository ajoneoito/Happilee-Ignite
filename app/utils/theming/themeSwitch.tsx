/**
 * ThemeChanger.tsx
 * @module ThemeChanger UI Intractor
 * @desc UI intraction for theme switching.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import useTheme from './useTheme';
import {THEMES} from './themes';
import {View} from 'react-native';
import DropDown from '../../components/DropdownPicker/drodpDown.component';
import {useTranslation} from 'react-i18next';
import {MMKVLoader} from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();

const ThemeSwitch = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    THEMES.find(({key}) => key === theme.activeTheme).value,
  );
  const {t} = useTranslation();
  return (
    //style || skin this component asper your requirement.
    <View>
      <DropDown
        title={t('settings:CHANGE_THEME')}
        placeholder={t('settings:CHANGE_THEME')}
        open={open}
        value={value}
        items={THEMES}
        schema={{
          label: 'key', // required
          value: 'value',
        }}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={async (item: any) => {
          theme.toggleTheme(item.key);
          await MMKV.setStringAsync('theme', item.key);
        }}
      />
    </View>
  );
};

export default ThemeSwitch;
