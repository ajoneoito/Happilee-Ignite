/**
 * useThemeStyles.ts
 * @module useThemeStyles
 * @desc Utility functions for react native app theme switching.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */

import useTheme from './useTheme';

//custom hooks: useTheme
const useThemedStyles = (styles: any) => {
  const theme = useTheme();
  return styles(theme);
};

export default useThemedStyles;
