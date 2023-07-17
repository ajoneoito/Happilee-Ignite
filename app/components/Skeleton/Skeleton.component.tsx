import React from 'react';
import { View } from 'react-native';
import { C } from '../../constants';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const dgl = C.measures.dgl

const LoadingView = () => {
    let skeleton = [];
    for (let i = 0; i < 6; i++) {
      skeleton.push(<View key={i} style={{ width: dgl*0.43, height: dgl*0.08,  alignSelf: 'center', marginBottom: dgl * 0.016 }}></View>);
    }
    return (
      <SkeletonPlaceholder speed={1000} backgroundColor={'#E1E9EE'} highlightColor={'#F2F8FC'}>
        {skeleton}
      </SkeletonPlaceholder>
    );
  }

export default LoadingView
