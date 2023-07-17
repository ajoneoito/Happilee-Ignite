import * as React from 'react';
import {
  View,
  Text,
  Modal,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {C} from '../../constants';
import {useSelector} from 'react-redux';
import useTheme from '../../utils/theming/useTheme';
import {RootState} from '../../redux/store/root.reducer';
import useThemedStyles from '../../utils/theming/useThemedStyles';
const dgl = C.measures.dgl;

export interface SpinnerPropTypes {
  cancelable?: boolean;
  color?: string;
  animation?: 'none' | 'slide' | 'fade';
  overlayColor?: string;
  size?: 'small' | 'large' | number; // size props does not support value normal
  textStyle?: TextStyle;
  indicatorStyle?: ViewStyle;
  customIndicator?: React.ReactNode;
  children?: React.ReactNode;
  spinnerKey?: string;
}

const Spinner = ({
  cancelable = false,
  animation = 'fade',
  overlayColor = 'rgba(0, 0, 0, 0.25)',
  indicatorStyle,
  children,
  spinnerKey,
}: SpinnerPropTypes) => {
  const spinnerState = useSelector((state: RootState) => state.spinner);

  const [spinnerVisible, setSpinnerVisibility] = React.useState(
    spinnerState.spinning,
  );
  const close = () => {
    setSpinnerVisibility(false);
  };

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };
  const styles = useThemedStyles(spinnerStyles);
  const theme = useTheme();

  React.useEffect(() => {
    setSpinnerVisibility(spinnerState.spinning);
  }, [spinnerState]);
  const _renderDefaultContent = () => {
    return (
      <View style={styles.outterWrap}>
        <View style={styles.innerWrap}>
          <ActivityIndicator
            color={theme.colors.TEXT_COLOR}
            size={dgl * 0.04}
            style={[styles.activityIndicator, {...indicatorStyle}]}
          />
          <Text numberOfLines={1} style={styles.loaderTitle}>
            {spinnerState.title}
          </Text>
          {spinnerState.body ? (
            <Text numberOfLines={1} style={styles.subTitle}>
              {spinnerState.body}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  const _renderSpinner = () => {
    const spinner = (
      <View
        style={[styles.container, {backgroundColor: overlayColor}]}
        key={spinnerKey || `spinner_${Date.now()}`}>
        {children || _renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => {
          _handleOnRequestClose();
        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}>
        {spinner}
      </Modal>
    );
  };

  return _renderSpinner();
};

const spinnerStyles = (theme: any) =>
  StyleSheet.create({
    activityIndicator: {
      flex: 1,
    },
    container: {
      backgroundColor: 'transparent',
      bottom: 0,
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    outterWrap: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      zIndex: 1000,
    },
    innerWrap: {
      backgroundColor: 'white',
      paddingVertical: dgl * 0.01,
      width: '93%',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: dgl * 0.03,
    },
    loaderTitle: {
      fontSize: theme.fontRef * dgl * 0.02,
      color: theme.colors.PRIMARY,
      fontFamily: C.font.SemiBold,
      paddingTop: dgl * 0.03,
      paddingBottom: dgl * 0.008,
      paddingHorizontal: dgl * 0.04,
    },
    subTitle: {
      fontSize: theme.fontRef * dgl * 0.017,
      color: theme.colors.GRAY_LIHGT,
      fontFamily: C.font.Regular,
      paddingBottom: dgl * 0.004,
      paddingHorizontal: dgl * 0.04,
      fontWeight: '400',
    },
  });

export default Spinner;
