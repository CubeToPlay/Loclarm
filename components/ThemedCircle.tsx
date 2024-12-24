import { ThemedView, ThemedViewProps } from "./ThemedView";

export type ThemedCircleProps = ThemedViewProps & {
  size: number;
};

export function ThemedCircle({ style, size, lightColor, darkColor, ...otherProps }: ThemedCircleProps) {

  return <ThemedView style={[{ width: size, height: size, borderRadius: "50%" }, style]} {...otherProps} lightColor={lightColor} darkColor={darkColor} />;
}