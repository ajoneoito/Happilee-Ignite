import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {style} from './Onboard.style';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {navigate} from '../../navigation/useNavigationUtils';
import {IllUstrationOne, IllUstrationThree, IllUstrationTwo} from './asset';
import {routeEnum} from '../../enums/route.enum';
// import {useDispatch, useSelector} from 'react-redux';
// import {counterSlice} from '../../redux/slices/counter.slice';
// import {RootState} from '../../redux/store/root.reducer';

const OnboardScreen = () => {
  // Just for a demo should be removed
  // const dispatch = useDispatch();
  // const {count} = useSelector((State: RootState) => State.counter);
  // // // / //

  const [onboardStatus, setOnboardStatus] = useState<number>(0);

  /**
   * Image url's to be rendered on the screen
   */
  const data: {imgUrl: any}[] = [
    {imgUrl: <IllUstrationOne />},
    {imgUrl: <IllUstrationTwo />},
    {imgUrl: <IllUstrationThree />},
  ];

  /**
   * update the onboardstate
   */
  const changeOnboardStatus = () => {
    if (onboardStatus === 2) {
      navigate(routeEnum.DRAWER);
    } else {
      setOnboardStatus(onboardStatus + 1);
    }
    // dispatch(counterSlice.actions.increment());
  };

  /**
   * Moving animation for slider thumb
   */
  const animatedThumb = useAnimatedStyle(() => {
    return {
      left: withTiming(19 * onboardStatus, {duration: 300}),
    };
  });
  return (
    <SafeAreaView>
      <View style={style.container}>
        <View style={style.skipArea}>
          <Text
            style={style.skipButton}
            onPress={() => {
              navigate(routeEnum.DRAWER);
            }}>
            Skip
          </Text>
        </View>
        <View style={style.imageArea}>{data[onboardStatus].imgUrl}</View>
        <View style={style.descArea}>
          <Text style={style.heading}>
            Track your mood and reflect on your day
          </Text>
          <Text style={style.desc}>
            Get an overview of how you are performing and motivate yourself to
            achieve even moew.
          </Text>
        </View>
        <View style={style.navigationArea}>
          <View style={style.progressTrack}>
            <Animated.View style={[style.progressThumb, animatedThumb]} />
          </View>
          <TouchableOpacity
            style={style.nextButton}
            onPress={changeOnboardStatus}>
            <Image source={require('./asset/Arrow.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardScreen;
