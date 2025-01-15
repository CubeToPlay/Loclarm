import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import TimeInput, { TimeInputAction } from "./TimeInput";
import NameInput, { NameInputAction } from "./NameInput";
import DeleteInput, { DeleteInputAction } from "./DeleteInput";

export interface Action {
    active: boolean,
    callback: (...props : any) => void
}

namespace Input {
    let update: () => void;

    const TimeInputAction : TimeInputAction = {active: false, time: [], callback: () => {}}
    const NameInputAction : NameInputAction = {active: false, name: "", callback: () => {}}
    const DeleteInputAction : DeleteInputAction = {active: false, name: "", callback: () => {}}

    export function Component() {
        const [, forceUpdate] = useState(0);
        update = () => forceUpdate(Math.random());

        if (!TimeInputAction.active && !NameInputAction.active && !DeleteInputAction.active) {
            return null;
        }

        return (
            <View style={styles.background}>
                <ThemedView style={styles.blur} lightColor={Colors.light.timeInputBackgroundBlur} darkColor={Colors.dark.timeInputBackgroundBlur}/>
                <TimeInput action={TimeInputAction} update={update}/>
                <NameInput action={NameInputAction} update={update}/>
                <DeleteInput action={DeleteInputAction} update={update}/>
            </View>
        )
    }

    export function time(time: Array<number>, callback: (time: Array<number>) => void) : void {
        TimeInputAction.active = true;
        TimeInputAction.time = time;
        TimeInputAction.callback = callback;
        update();
    }

    export function name(name: string, callback: (name: string) => void) : void {
        NameInputAction.active = true;
        NameInputAction.name = name;
        NameInputAction.callback = callback;
        update();
    }

    export function confirmDelete(name: string, callback: () => void) : void {
        DeleteInputAction.active = true;
        DeleteInputAction.name = name;
        DeleteInputAction.callback = callback;
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