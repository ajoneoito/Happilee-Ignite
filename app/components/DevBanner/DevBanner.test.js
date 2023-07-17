import React from 'react';
import renderer from 'react-test-renderer';
import DevBanner from './DevBanner.component';

test('renders correctly', () => {
  const tree = renderer.create(<DevBanner />).toJSON();
  expect(tree).toMatchSnapshot();
});
