/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const alarmEnabled = '#6BAEFD';
const alarmDisabled = '#797979';

export const Colors = {
  light: {
    text: '#11181C',
    buttonText: '#11181C',
    buttonDisabledText: '#858585',

    background: '#fff',
    viewBackground: '#DCEEFF',

    alarmCloseEditButtonBackground: '#6C778F',
    alarmButtonBackground: '#DEDEDE',
    alarmEnabled: alarmEnabled,
    alarmDisabled: alarmDisabled,

    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    buttonText: '#FFFFFF',
    buttonDisabledText: '#C8C8C8',

    background: '#2F3645',
    viewBackground: '#6F7983',

    alarmCloseEditButtonBackground: '#6C778F',
    alarmButtonBackground: '#50586A',
    alarmEnabled: alarmEnabled,
    alarmDisabled: alarmDisabled,
    
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
