import * as React from 'react';
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {C} from '../../../constants';
import {ACTION, ALERT_TYPE, ENV} from '../config';
import {Color, getImage} from '../service';
const dgl = C.measures.dgl;

export type IConfigDialog = {
  type?: ALERT_TYPE;
  title?: string | undefined | null;
  textBody?: string;
  button?: string | undefined | null;
  show?: boolean;
  butonText?: string | undefined | null;
  autoClose?: number | boolean;
  closeOnOverlayTap?: boolean;
  onPressButton?: () => void;
  onShow?: () => void;
  onHide?: () => void;
  onPressBtn?: () => void;
};

type IProps = {
  isDark: boolean;
  config?: Pick<IConfigDialog, 'closeOnOverlayTap' | 'autoClose'>;
};

type IState = {
  styles: ReturnType<typeof __styles>;
  overlayClose?: boolean;
  visible: boolean;
  config?: IConfigDialog;
};

export class Dialog extends React.Component<IProps, IState> {
  /**
   * @type {React.RefObject<Dialog>}
   */
  public static instance: React.RefObject<Dialog> = React.createRef();

  /**
   * @param {IConfig} args
   */
  public static show = (args: IConfigDialog): void => {
    Dialog.instance.current?._open(args);
  };

  /**
   *
   */
  public static hide = (): void => {
    Dialog.instance.current?._close();
  };

  private _timeout?: NodeJS.Timeout;

  /**
   * @type {Animated.Value}
   * @private
   */
  private readonly _opacity: Animated.Value;

  /**
   * @type {Animated.Value}
   * @private
   */
  private readonly _positionDialog: Animated.Value;

  /**
   * @type {number}
   * @private
   */
  private _popupHeight: number;

  /**
   * @param {IProps} props
   */
  constructor(props: IProps) {
    super(props);
    this._opacity = new Animated.Value(0);
    this._positionDialog = new Animated.Value(ENV.WINDOWS.HEIGHT + 30);
    this._popupHeight = 0;

    this.state = {
      styles: __styles(props.isDark),
      visible: false,
    };
  }

  /**
   * @param {Readonly<IProps>} prevProps
   */
  public componentDidUpdate = (prevProps: Readonly<IProps>): void => {
    if (prevProps.isDark !== this.props.isDark) {
      this.setState(prevState => ({
        ...prevState,
        styles: __styles(this.props.isDark),
      }));
    }
  };

  /**
   * @param {IConfig} config
   */
  private _open = async (config: IConfigDialog): Promise<void> => {
    if (this.state.visible) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      await this._startAnimation(ACTION.CLOSE, false);
      await new Promise<void>(resolve =>
        this.setState(prevState => ({...prevState, config}), resolve),
      );
      await this._startAnimation(ACTION.OPEN);
      return;
    }

    this.setState(prevState => ({...prevState, visible: true, config}));
  };

  /**
   * @return {Promise<void>}
   */
  private _close = async (): Promise<void> => {
    if (!this.state.visible) {
      return;
    }
    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    await this._startAnimation(ACTION.CLOSE);
    const onHide = this.state.config?.onHide;
    await new Promise<void>(resolve =>
      this.setState(
        prevState => ({...prevState, config: undefined, visible: false}),
        resolve,
      ),
    );
    onHide?.();
  };

  /**
   * @return {Promise<void>}
   */
  private _showModalHandler = async (): Promise<void> => {
    await this._startAnimation(ACTION.OPEN);
    const autoClose =
      this.state.config?.autoClose !== undefined
        ? this.state.config?.autoClose
        : this.props.config?.autoClose;
    if (autoClose) {
      const duration =
        typeof autoClose === 'number' ? autoClose : ENV.AUTO_CLOSE;
      this._timeout = setTimeout(() => {
        this._close();
      }, duration);
    }
    this.state.config!.onShow?.();
  };

  /**
   * @param {ACTION} action
   * @param opacity
   * @return {Promise<void>}
   */
  private _startAnimation = (
    action: ACTION,
    opacity: boolean = true,
  ): Promise<void> => {
    const open = action === ACTION.OPEN;

    let animations = [
      opacity
        ? Animated.timing(this._opacity, {
            toValue: action === ACTION.OPEN ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
          })
        : null!,
      Animated[open ? 'spring' : 'timing'](this._positionDialog, {
        toValue: open
          ? ENV.WINDOWS.HEIGHT / 2 - this._popupHeight / 2
          : ENV.WINDOWS.HEIGHT + 60,
        ...(open ? {bounciness: 12} : {duration: 250}),
        useNativeDriver: true,
      }),
    ].filter(Boolean);

    if (!open) {
      animations = animations.reverse();
    }

    return new Promise(resolve => {
      Animated.sequence(animations).start(() => resolve());
    });
  };

  /**
   * @return {JSX.Element}
   */
  private _buttonRender = (): JSX.Element => {
    const {styles} = this.state;
    const {onPressButton, button, butonText, onPressBtn} = this.state.config!;

    return (
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.button,
            styles.buttonText,
            // styles[type],
          ])}
          onPress={onPressBtn ?? this._close}>
          <Text style={[styles.buttonLabel, styles.btn]}>{button}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={StyleSheet.flatten([styles.button, styles.buttonContainer])}
          onPress={() => {
            onPressButton();
            this._close();
          }}>
          <Text style={styles.buttonLabel}>{butonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * @return {JSX.Element}
   */
  private _OverlayCloseRender = (): JSX.Element => {
    if (
      this.state.config?.closeOnOverlayTap === false
        ? false
        : this.props.config?.closeOnOverlayTap !== false
    ) {
      // eslint-disable-next-line react-native/no-inline-styles
      return <TouchableOpacity onPressIn={this._close} style={{flex: 1}} />;
    }
    return <></>;
  };

  /**
   * @return {JSX.Element}
   */
  private _CardRender = (): JSX.Element => {
    if (!this.state.config) {
      return <></>;
    }

    const {
      styles,
      config: {title, type, show},
    } = this.state;
    const {_buttonRender} = this;
    return (
      <Animated.View
        onLayout={({
          nativeEvent: {
            layout: {height},
          },
        }) => (this._popupHeight = height)}
        style={StyleSheet.flatten([
          styles.cardContainer,
          {transform: [{translateY: this._positionDialog}]},
        ])}>
        {show === true ? <View style={styles.backendImage} /> : null}
        {show ? (
          <Image
            source={getImage(type)}
            resizeMode="contain"
            style={StyleSheet.flatten([styles.image, styles[`${type}Image`]])}
          />
        ) : null}
        <View style={styles.cardBody}>
          {title && <Text style={styles.titleLabel}>{title}</Text>}
          {/* {textBody && <Text style={styles.descLabel}>{textBody}</Text>} */}
        </View>
        <View style={styles.cardFooter}>
          <_buttonRender />
        </View>
      </Animated.View>
    );
  };

  /**
   * @return {JSX.Element}
   */
  public render = (): JSX.Element => {
    const {visible, styles} = this.state;
    const {_OverlayCloseRender, _CardRender} = this;
    return (
      <Modal
        transparent={true}
        visible={visible}
        animated={false}
        onShow={this._showModalHandler}>
        <Animated.View
          style={StyleSheet.flatten([
            styles.backgroundContainer,
            {opacity: this._opacity},
          ])}
        />
        <_OverlayCloseRender />
        <_CardRender />
      </Modal>
    );
  };
}

const __styles = (isDark: boolean) =>
  StyleSheet.create({
    backgroundContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#00000070',
    },
    cardContainer: {
      alignSelf: 'center',
      maxWidth: 400,
      width: '90%',
      minHeight: 170,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingTop: 5,
      position: 'absolute',
      backgroundColor: Color.get('card', isDark),
    },

    cardBody: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      overflow: 'hidden',
    },
    cardFooter: {},
    titleLabel: {
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: C.font.SemiBold,
      color: '#012040',
      textAlign: 'center',
      paddingHorizontal: dgl * 0.04,
      paddingTop: dgl * 0.023,
    },
    descLabel: {
      textAlign: 'center',
      color: Color.get('label', isDark),
    },
    button: {
      borderRadius: 50,
      height: '80%',
      width: '48%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: dgl * 0.01,
      borderWidth: 1,
    },
    buttonLabel: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: C.font.SemiBold,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      width: '100%',
      paddingBottom: 1,
    },
    buttonContainer: {
      backgroundColor: '#199CD9',
      borderColor: 'transparent',
    },
    [ALERT_TYPE.SUCCESS]: {
      backgroundColor: '#199CD9',
    },
    [ALERT_TYPE.DANGER]: {
      backgroundColor: Color.get('danger', isDark),
    },
    [ALERT_TYPE.WARNING]: {
      backgroundColor: Color.get('warning', isDark),
    },
    backendImage: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 50,
      width: 50,
      backgroundColor: '#FBFBFB',
      borderRadius: 100,
      marginTop: -10,
    },
    image: {
      alignSelf: 'center',
      width: 80,
      aspectRatio: 1,
      position: 'absolute',
      top: -30,
    },
    buttonText: {
      borderColor: '#6A737D',
      backgroundColor: '#ffffff',
    },
    btn: {
      color: '#6A737D',
    },

    [`${ALERT_TYPE.SUCCESS}Image`]: {
      tintColor: Color.get('success', isDark),
    },
    [`${ALERT_TYPE.DANGER}Image`]: {
      tintColor: Color.get('danger', isDark),
    },
    [`${ALERT_TYPE.WARNING}Image`]: {
      tintColor: Color.get('warning', isDark),
    },
  });
