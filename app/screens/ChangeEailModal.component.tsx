import {View, Text, TextInput, ScrollView, Pressable} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {C} from '../../../constants';
import measures from '../../../constants/measures';
import useThemedStyles from '../../../utils/theming/useThemedStyles';
import {FBLeadsProfileStyle} from '../FBLeadsProfile.style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ModalCloseIcon} from '../../../assets';
import InputField from '../../../components/InputField/InputField.component';
import {Otp} from '../../authentication/Auth.component';
import OtpInputs from 'react-native-otp-inputs';

const dgl = C.measures.dgl;

const ChangeEailModal = (props: {
  isVisible: boolean;
  type: string;
  onBackdropPress: () => void;
}) => {
  const styles = useThemedStyles(FBLeadsProfileStyle);
  const {isVisible, onBackdropPress, type} = props;
  return (
    <Modal
      statusBarTranslucent
      style={styles.modalStyle}
      isVisible={isVisible}
      hasBackdrop
      onBackdropPress={onBackdropPress}
      avoidKeyboard
      animationIn={'fadeInUp'}>
      <View style={[styles.modalContainer]}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTextStyle}>
              {type === 'Email' ? 'Change Email ID' : 'Change mobile number'}
            </Text>
            <ModalCloseIcon onPress={onBackdropPress} />
          </View>
          <View style={styles.border} />
          <Text style={styles.subHeaderText}>
            {' '}
            {type === 'Email' ? 'New Email' : 'New mobile number'}
          </Text>
          <InputField
            width="100%"
            placeholder={
              type === 'Email' ? 'Enter email' : 'Enter mobile number'
            }
            value={''}
            onChangeText={() => {}}
            contentContainerStyle={styles.containerBackground}
            placeholderTextColor={'rgba(1, 32, 64, 0.5)'}
            inputStyle={styles.inputStyle}
          />
          <Text style={styles.textStyle}>VERIFY</Text>
          <Text style={styles.verifyText}>
            Please enter the verification code sent to +91 XXXXX -XXX81 and [old
            email]
          </Text>
          {/* <Otp
            onChangeText={(value: string) => console.log(value)}
            error={''}
          /> */}
          <OtpInputs
            autofillFromClipboard
            numberOfInputs={6}
            style={styles.content}
            inputContainerStyles={styles.box}
            inputStyles={[styles.text]}
            focusStyles={[styles.focus, {}]}
            handleChange={(value: string) => console.log(value)}
          />
          <Text style={[styles.textStyle, {marginTop: -dgl * 0.02}]}>
            RESEND CODE
          </Text>
          <View style={styles.buttonConatiner}>
            <Pressable style={styles.button1} onPress={onBackdropPress}>
              <Text style={styles.btnText1}>CANCEL</Text>
            </Pressable>
            <Pressable style={styles.button2}>
              <Text style={styles.btnText2}>
                {type === 'Email' ? 'UPDATE' : 'SAVE CHANGES'}
              </Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default ChangeEailModal;
