import {SafeAreaView, View, Button} from 'react-native';
import React from 'react';
import {style} from './ReAnimated.style';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const ReAnimatedScreen = () => {
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: 100,
      width: 100,
      backgroundColor: 'blue',
      transform: [
        {
          translateX: withSpring(offset.value * 255),
        },
      ],
      borderRadius: 10,
    };
  });

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Animated.View style={[animatedStyles]} />
      </View>
      <Button
        title="press me"
        onPress={() => {
          offset.value = withSpring(Math.random());
        }}
      />
    </SafeAreaView>
  );
};

export default ReAnimatedScreen;
