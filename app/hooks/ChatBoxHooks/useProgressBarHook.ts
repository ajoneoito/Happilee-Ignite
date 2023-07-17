/* eslint-disable react-hooks/exhaustive-deps */
import {Circle} from 'react-native-svg';
import {Animated, TextInput} from 'react-native';
import {createRef, useEffect, useRef, useState} from 'react';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const ProgressBarHook = (
  radius: number,
  strokeWidth: number,
  duration: number,
  delay: number,
  isPercentage: boolean,
  max: number,
  value: number,
) => {
  const [width, setWidth] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  const circleRef = createRef<Circle>();
  const inputRef = createRef<TextInput>();
  const textRef = createRef<TextInput>();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const animation = (toValue: number) => {
    return Animated.timing(AnimatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {
      setShowIndicator(true);
    });
  };
  useEffect(() => {
    animation(value);
    AnimatedValue.addListener(v => {
      if (circleRef?.current) {
        const maxPrec = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPrec) / 100;
        circleRef?.current?.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}${isPercentage ? '%' : ''}`,
        });
      }
      if (textRef?.current) {
        textRef.current.setNativeProps({
          text: `${Math.round(v.value)}${isPercentage ? '%' : '/'}${
            !isPercentage ? max : ''
          }`,
        });
      }
    });

    return () => {
      AnimatedValue.removeAllListeners();
      AnimatedValue.stopAnimation();
    };
  }, [max, value]);

  const updateWidth = (val: number) => {
    setWidth(val);
  };

  return {
    showIndicator,
    AnimatedCircle,
    AnimatedInput,
    halfCircle,
    circleCircumference,
    inputRef,
    circleRef,
    animatedValue,
    reactive,
    width,
    textRef,
    updateWidth,
  };
};

export default ProgressBarHook;
