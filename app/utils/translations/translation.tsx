/**
 * @author jose
 * @version 0.0.1
 *
 */
import * as React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import useThemedStyles from '../theming/useThemedStyles';
import {transaltionStyle} from './translation.style';
import DropDown from '../../components/DropdownPicker/drodpDown.component';
export default function Translation() {
  const LANGUAGES = [
    {code: 'en', label: 'English'},
    {code: 'ml', label: 'Malayalam'},
  ];
  const {i18n, t} = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(i18n.language);
  const styles = useThemedStyles(transaltionStyle);
  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <DropDown
        title={t('settings:LANGUAGE_SELECTOR')}
        placeholder={t('settings:LANGUAGE_SELECTOR')}
        open={open}
        value={value}
        items={LANGUAGES}
        schema={{
          label: 'label', // required
          value: 'code',
        }}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={(item: any) => {
          setLanguage(item.code);
        }}
      />
    </View>
  );
}
