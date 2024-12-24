import { Pressable, type ViewProps, type PressableProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedPressableProps = PressableProps & ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedPressable({ style, lightColor, darkColor, ...otherProps }: ThemedPressableProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'viewBackground');
    
  return <Pressable style={[{ backgroundColor }, style]} {...otherProps} />;
}
