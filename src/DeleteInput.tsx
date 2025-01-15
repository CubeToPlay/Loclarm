import ThemedInput from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from "react-native"
import { Action } from "./Input";

export interface DeleteInputAction extends Action {
    active: boolean,
    name: string,
    callback: () => void
}

export default function DeleteInput( { action, update } : { action: DeleteInputAction, update : () => void}) {
    if (!action.active) {
        return null;
    }

    function close() {
        action.active = false;
        update();
    }

    function onYes() {
        action.callback();
        close();
    }

    return (
        <ThemedInput options={{
            title: `Delete '${action.name}'`,
            leftButtonText: "No",
            leftButtonCallback: close,
            rightButtonText: "Yes",
            rightButtonCallback: onYes,
        }}>
            <ThemedText style={styles.confirmText}>
                Are you sure?
            </ThemedText>
        </ThemedInput>
    )
}

const styles = StyleSheet.create({
    confirmText: {
        position: "absolute",
        textAlignVertical: "center",
        fontSize: 18,
        fontWeight: "500",
        marginLeft: "5%",
        marginTop: "12%",
    },
})

