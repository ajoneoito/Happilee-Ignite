/**
 * ThemeProvider.tsx
 * @module ThemeProvider Context API
 * @desc Theme context for the whole application.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React, {useState} from 'react';
import {colors} from './colors';
import {MMKVLoader} from 'react-native-mmkv-storage';

/**
 * Context lets us pass a value deep into the component tree.
 * without explicitly threading it through every component.
 * Wrap your whole application inside this context.
 * @returns context for the current theme.
 */
export const ThemeContext = React.createContext<any>({});

const ThemeProvider = ({children}) => {
  const [activeTheme, setActiveTheme] = useState('light');
  const [fontRef, setFontRef] = useState(1);
  const toggleTheme = (theme: string) => {
    setActiveTheme(theme);
  };
  const MMKV = new MMKVLoader().initialize();
  const fontScaler = (size: number) => {
    setFontRef(size);
  };
  React.useEffect(() => {
    async function fetchData() {
      let t = '';
      let fontScale = 1;
      fontScale = await MMKV.getIntAsync('fontRef');

      t = await MMKV.getStringAsync('theme');
      if (t) {
        setActiveTheme(t);
      }
      if (fontScale) {
        setFontRef(fontScale);
      }
    }
    fetchData();
  }, []);
  const theme = {
    // Active theme colors
    colors: colors[activeTheme],
    // Font size reference
    fontRef: fontRef,
    //active theme
    activeTheme: activeTheme,
    // Theme changing function
    toggleTheme,
    //Font size managing function
    fontScaler,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
