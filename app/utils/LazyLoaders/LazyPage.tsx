import React, {Suspense} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const withPageSuspense = (
  Component: React.LazyExoticComponent<(props: any) => JSX.Element>,
  PageFallBackUi: () => JSX.Element,
) => {
  return (props: any) => {
    return (
      <Suspense fallback={<PageFallBackUi />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export const PageFallBackUi = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator size={'large'} color={'blue'} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
