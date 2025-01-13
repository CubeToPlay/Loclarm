import { useThemeColor } from '@/hooks/useThemeColor';
import { BlurView, type BlurViewProps } from "@react-native-community/blur";

export type ThemedBlurViewProps = BlurViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedBlurView({ style, lightColor, darkColor, ...otherProps }: ThemedBlurViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'viewBackground');

  return <BlurView style={[{ backgroundColor }, style]} {...otherProps} />;
}
