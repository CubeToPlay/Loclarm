import ThemedInput from "@/components/ThemedInput";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet } from "react-native"
import { Action } from "./Input";
import { useThemeColor } from "@/hooks/useThemeColor";

export interface NameInputAction extends Action {
    active: boolean,
    name: string,
    callback: (text : string) => void
}

export default function NameInput( { action, update } : { action: NameInputAction, update : () => void}) {
    if (!action.active) {
        return null;
    }

    const [text, onChangeText] = useState(action.name);
    
    function close() {
        action.active = false;
        update();
    }

    function onOk() {
        action.callback(text);
        close();
    }

    return (
        <ThemedInput options={{
            title: "Alarm Name",
            leftButtonText: "Cancel",
            leftButtonCallback: close,
            rightButtonText: "Ok",
            rightButtonCallback: onOk,
        }}>
            <ThemedView style={styles.inputBackground}>
                <ThemedTextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    autoFocus={true}
                    cursorColor={useThemeColor({}, "text")}
                />
            </ThemedView>
        </ThemedInput>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: "2%",
        paddingBottom: "0%",
        marginTop: "-1%",
        textAlignVertical: "center",
        fontSize: 15,
        fontWeight: "500"
    },
    inputBackground: {
        position: "absolute",
        width: "90%",
        height: "20%",
        alignSelf: "center",
        marginTop: "17%"
    }
})

