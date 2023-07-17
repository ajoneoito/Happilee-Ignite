import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  // Layout Styles
  container: {
    height: '100%',
    width: '100%',
  },
  skipArea: {
    height: '5%',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  imageArea: {
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descArea: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  navigationArea: {
    height: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  // Component styles
  skipButton: {
    textAlign: 'right',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#26c88d',
    width: 62,
    height: 62,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
    color: '#607da0',
  },
  desc: {
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    fontSize: 14,
    color: '#b2c1cc',
  },
  progressTrack: {
    height: 4,
    width: 57,
    backgroundColor: '#26c88d50',
    borderRadius: 50,
    position: 'relative',
  },
  progressThumb: {
    backgroundColor: '#26c88d',
    height: 4,
    width: 19,
    borderRadius: 50,
    position: 'absolute',
  },
});
