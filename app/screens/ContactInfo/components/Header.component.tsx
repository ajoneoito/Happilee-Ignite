import React from 'react';
import {View, Text} from 'react-native';
import {LeftArrow, PenIcon} from '../../../assets';
import ContactInfoStyle from '../ContactInfo.style';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import {ContactInfoHeader} from '../../../interface/ContactInfoInterface';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/root.reducer';

const HeaderComponent = (props: ContactInfoHeader) => {
  const {styles} = useThemedStyles(ContactInfoStyle);
  const {edit, onPress, onBackPress, onPressSaveButton} = props;
  const AudioPlayer = useSelector((state: RootState) => state.closeAudioPLayer);
  try {
    return (
      <View
        style={[
          styles.rowView,
          AudioPlayer?.isAudioPlaying === null ? undefined : styles.paddingTop,
        ]}>
        <LeftArrow onPress={onBackPress} />
        <View style={styles.editSection}>
          {edit ? (
            <Text
              style={styles.saveBtn}
              onPress={() => {
                onPress(false);
                onPressSaveButton();
              }}>
              SAVE
            </Text>
          ) : (
            <PenIcon
              onPress={() => {
                onPress(true);
              }}
            />
          )}
        </View>
      </View>
    );
  } catch (error) {
    return <View />;
  }
};

export default HeaderComponent;
