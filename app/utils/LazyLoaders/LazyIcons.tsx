import React, {Suspense} from 'react';
import {SvgProps} from 'react-native-svg';

function withIconSuspense(Icon: React.LazyExoticComponent<React.FC<SvgProps>>) {
  return (props: any) => {
    return (
      <Suspense fallback={<FallBackUi />}>
        <Icon {...props} />
      </Suspense>
    );
  };
}

function FallBackUi() {
  return null;
}

export {withIconSuspense, FallBackUi};
