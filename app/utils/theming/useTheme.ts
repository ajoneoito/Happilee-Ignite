/**
 * useTheme.ts
 * @module useThemeHooks
 * @desc Utility functions for react native app theme switching.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {useContext} from 'react';
import {ThemeContext} from './themeProvider';

//custom hooks: useTheme
const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
