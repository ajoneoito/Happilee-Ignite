import {View, Text} from 'react-native';
import React from 'react';
import {DevBannerStyle} from './DevBanner.style';
const DevBanner = () => {
  return (
    <View style={DevBannerStyle.container}>
      <Text>Dev Preview</Text>
    </View>
  );
};

export default DevBanner;
