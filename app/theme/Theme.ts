import { createTheme } from "@fluentui/react";

const darkPalette = {
    palette: {
      themePrimary: '#0078d4',
      themeLighterAlt: '#eff6fc',
      themeLighter: '#deecf9',
      themeLight: '#c7e0f4',
      themeTertiary: '#71afe5',
      themeSecondary: '#2b88d8',
      themeDarkAlt: '#106ebe',
      themeDark: '#005a9e',
      themeDarker: '#004578',
      neutralLighterAlt: '#1e1e1e',
      neutralLighter: '#282727',
      neutralLight: '#363636',
      neutralQuaternaryAlt: '#403f3f',
      neutralQuaternary: '#474747',
      neutralTertiaryAlt: '#666666',
      neutralTertiary: '#c8c8c8',
      neutralSecondary: '#d0d0d0',
      neutralPrimaryAlt: '#dadada',
      neutralPrimary: '#ffffff',
      neutralDark: '#f4f4f4',
      black: '#f8f8f8',
      white: '#141414',
    }
}

const lightPalette = {
    palette: {
      themePrimary: '#0078d4',
      themeLighterAlt: '#eff6fc',
      themeLighter: '#deecf9',
      themeLight: '#c7e0f4',
      themeTertiary: '#71afe5',
      themeSecondary: '#2b88d8',
      themeDarkAlt: '#106ebe',
      themeDark: '#005a9e',
      themeDarker: '#004578',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#aaa8a7',
      neutralSecondary: '#8f8d8b',
      neutralPrimaryAlt: '#73716f',
      neutralPrimary: '#050505',
      neutralDark: '#3c3b39',
      black: '#21201f',
      white: '#ffffff',
    }
}

const darkTheme = createTheme(darkPalette)
const lightTheme = createTheme(lightPalette)

export {
    darkTheme,
    lightTheme
};
