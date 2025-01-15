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

    alarmCloseEditButtonBackground: '#CFCFCF',
    alarmButtonBackground: '#DEDEDE',
    alarmEnabled: alarmEnabled,
    alarmDisabled: alarmDisabled,

    weekButtonEnabled: '#8292FA',
    weekButtonDisabled: '#CFCFCF',

    repeatCustomText: '#525252',

    timeInputBackgroundBlur: '#B6B6B6',

    timeInputBackground: '#DCEEFF',
    keypadButtonBackground: '#BAD9F7',

    timeBackground: '#B6D4F0',
    timeBlock: '#E2E9F0',

    timeBlockSelected: '#89BEF0',

    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    
    calendarBackground: "#000000",
    textSectionTitleColor: "#000000",
    selectedDayBackgroundColor: "#000000",
    selectedDayTextColor: "#000000",
    todayTextColor: "#000000",
    dayTextColor: "#000000",
    textDisabledColor: "#000000",
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

    weekButtonEnabled: '#8292FA',
    weekButtonDisabled: '#6C778F',
    
    repeatCustomText: '#ADBFE5',

    timeInputBackgroundBlur: '#686868',

    timeInputBackground: '#2F3645',
    keypadButtonBackground: '#616A73',

    timeBackground: '#616A73',
    timeBlock: '#565E66',

    timeBlockSelected: '#6775DB',

    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    calendarBackground: "#000000",
    textSectionTitleColor: '#b6c1cd',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#2d4150',
    textDisabledColor: '#dd99ee',
  },
};
