import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import {C} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import {hideSlice} from '../../redux/slices/loader.slice';
import useThemedStyles from '../../utils/theming/useThemedStyles';
const dgl = C.measures.dgl;

const Loader = () => {
  const dispatch = useDispatch();
  const style = useThemedStyles(styles);
  // const {t} = useTranslation();

  const enable = useSelector((state: RootState) => state?.loader);

  useEffect(() => {
    if (enable.enable === true) {
      setTimeout(() => {
        dispatch(
          hideSlice({
            enable: false,
          }),
        );
      }, 1000000);
    }
  }, [dispatch, enable]);

  return enable?.enable ? (
    <>
      <Modal
        isVisible={true}
        // styles={{zIndex: 1100}}
      >
        <StatusBar hidden={true} />
        <View style={style.outterWrap}>
          <View style={style.innerWrap}>
            <ActivityIndicator
              width={dgl * 0.039}
              height={dgl * 0.039}
              color={'#199CD9'}
            />
            <Text numberOfLines={1} style={style.loaderTitle}>
              {enable.loaderTitle}
            </Text>
            <Text numberOfLines={1} style={style.subTitle}>
              {enable.subTitle}
            </Text>
          </View>
        </View>
      </Modal>
    </>
  ) : null;
};

export default Loader;

const styles = (theme: any) =>
  StyleSheet.create({
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
      width: dgl * 0.42,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    loaderTitle: {
      fontSize: theme.fontRef * dgl * 0.024,
      color: theme.colors.BLACK,
      fontFamily: C.font.SemiBold,
      paddingTop: dgl * 0.015,
      paddingBottom: dgl * 0.008,
      paddingHorizontal: dgl * 0.04,
    },
    subTitle: {
      fontSize: theme.fontRef * dgl * 0.017,
      color: theme.colors.TEXT_GRAY_LIGHT,
      fontFamily: C.font.Regular,
      paddingBottom: dgl * 0.004,
      paddingHorizontal: dgl * 0.04,
      fontWeight: '400',
    },
  });
