import {lazy} from 'react';
import {
  withIconSuspense,
  FallBackUi,
} from '../../../utils/LazyLoaders/LazyIcons';

const IllUstrationOne = withIconSuspense(
  lazy(() => import('./illustrationOne.svg')),
  FallBackUi,
);

const IllUstrationTwo = withIconSuspense(
  lazy(() => import('./illustrationTwo.svg')),
  FallBackUi,
);

const IllUstrationThree = withIconSuspense(
  lazy(() => import('./illustrationThree.svg')),
  FallBackUi,
);

export {IllUstrationOne, IllUstrationTwo, IllUstrationThree};
