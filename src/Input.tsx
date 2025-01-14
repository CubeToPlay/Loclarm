import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";
import TimeInput, { TimeInputAction } from "./TimeInput";
import { useState } from "react";

namespace Input {
    let update: () => void;
    let timeInputAction : TimeInputAction = {active: false, time: [], callback: () => {}}

    export function Component() {
        const [, forceUpdate] = useState(0);
        update = () => forceUpdate(Math.random());

        if (!timeInputAction.active) {
            return null;
        }

        return (
            <View style={styles.background}>
                <ThemedView style={styles.blur} lightColor={Colors.light.timeInputBackgroundBlur} darkColor={Colors.dark.timeInputBackgroundBlur}/>
                <TimeInput action={timeInputAction} update={update}/>
            </View>
        )
    }

    export function time(time: Array<number>, callback: (time: Array<number>) => void) : void {
        timeInputAction = {
            active: true,
            time: time,
            callback: callback
        }
        update();
    }

    export function text(input: string, callback: (output: string) => void) : void {
        update();
    }

    const styles = StyleSheet.create({
        background: {
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 10
        },
        blur: {
            flex: 1,
            opacity: 0.5
        },
    });
}

export default Input;