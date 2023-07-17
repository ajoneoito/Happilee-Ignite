import {Text as RnText} from 'react-native';
import React from 'react';

interface Props {
  content: string;
}

/**
 * Text component that support LTR Layout
 * @param content: The Text to be rendered
 * @returns JSX component
 */
const Text = ({content}: Props) => {
  return (
    <>
      <RnText>{content}</RnText>
    </>
  );
};

export default Text;
