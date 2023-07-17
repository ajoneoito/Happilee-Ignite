import {StyleSheet} from 'react-native';

const CircularPrgressBarStylesHook = (radius: number | undefined) => {
  const styles = StyleSheet.create({
    circleMainView: {
      width: radius ? radius * 2 : 220,
      height: radius ? radius * 2 : 220,
    },
    animatedText: {
      fontSize: radius ? radius / 4 : 18,
      color: '#212121',
    },
    marginTop: {marginTop: 2},
  });

  return {styles};
};

export default CircularPrgressBarStylesHook;
