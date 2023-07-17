/**
 * FontScaler.tsx
 * @module FontScaler UI Intractor
 * @desc UI intraction for font size managing.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import useTheme from './useTheme';
import {View} from 'react-native';
import Slider from '@react-native-community/slider';
import {MMKVLoader} from 'react-native-mmkv-storage';
const MMKV = new MMKVLoader().initialize();
const FontScaler = () => {
  const theme = useTheme();
  return (
    //style || skin this component asper your requirement.
    <View>
      <Slider
        style={{width: '100%', height: 50}}
        minimumValue={1}
        maximumValue={2}
        value={theme.fontRef}
        minimumTrackTintColor={theme.TEXT_COLOR}
        maximumTrackTintColor={theme.TEXT_BLACK}
        onValueChange={async (value: number) => {
          if (value >= 1) {
            theme.fontScaler(value);
            await MMKV.setIntAsync('fontRef', value);
          }
        }}
      />
    </View>
  );
};

export default FontScaler;
