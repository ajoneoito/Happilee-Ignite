import React from 'react';
import {C} from '../../constants';
import Modal from 'react-native-modal';
import {StatusBar, StyleSheet, Text, View, ViewStyle} from 'react-native';
import useThemedStyles from '../../utils/theming/useThemedStyles';

const dgl = C.measures.dgl;
interface Props {
  children: any;
  isVisible?: boolean;
  modalHeaderText?: string | null;
  onBackground_Press?: () => void;
  handleIsModalInvisible?: () => void;
  onBackgroundPress?: () => void;
  modalHeaderStyle?: ViewStyle;
  modalHeader?: ViewStyle;
  title?: string;
  data?: any;
  handleSelect?: () => void;
  onPress?: () => void;
  style?: ViewStyle;
  modalContainer?: ViewStyle;
}

const ModalStructure = (props: Props) => {
  const style = useThemedStyles(styles);
  return (
    <Modal
      style={[props.style, style.modal]}
      isVisible={props.isVisible}
      onBackButtonPress={props.onBackgroundPress}
      onBackdropPress={props.onBackground_Press}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}>
      <View style={[style.modalContainer, props.modalContainer]}>
        <StatusBar barStyle="light-content" />
        <View style={[style.modalHeader, props.modalHeader]}>
          <Text style={[style.modalHeaderText, props.modalHeaderStyle]}>
            {props.modalHeaderText}
          </Text>
        </View>

        {props.children}
      </View>
    </Modal>
  );
};

export default ModalStructure;

const styles = (theme: any) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'center',
      maxHeight: '100%',
      minHeight: '50%',
    },
    modalContainer: {
      overflow: 'scroll',
      backgroundColor: '#ffffff',
      borderRadius: 12,
      paddingBottom: dgl * 0.01,
    },
    modalHeader: {
      paddingBottom: dgl * 0.02,
      paddingTop: dgl * 0.0245,
    },
    modalHeaderText: {
      color: theme.colors.MESSAGE_TEXT_COLOR,
      fontSize: dgl * 0.023,
      fontFamily: C.font.SemiBold,
      paddingHorizontal: dgl * 0.025,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: dgl * 0.02,
      paddingVertical: dgl * 0.015,
    },
  });
