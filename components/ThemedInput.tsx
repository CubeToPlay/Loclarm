import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Pressable } from "react-native"

interface ThemedInputOptions {
    title : string,
    leftButtonText : string,
    rightButtonText : string,
    leftButtonCallback : () => void,
    rightButtonCallback : () => void,
}

interface ThemedInputProps {
    children : React.JSX.Element;
    options : ThemedInputOptions
}

export default function ThemedInput( { children, options } : ThemedInputProps) {
    return (
        <ThemedView style={styles.background} lightColor={Colors.light.timeInputBackground} darkColor={Colors.dark.timeInputBackground}>
            <ThemedText style={styles.titleText}>
                {options.title}
            </ThemedText>
            {children}
            <View style={styles.interactBackground}>
                <Pressable style={styles.interactPressable} onPress={options.leftButtonCallback}>
                    <ThemedText style={styles.interactText}>
                        {options.leftButtonText}
                    </ThemedText>    
                </Pressable>
                <Pressable style={styles.interactPressable} onPress={options.rightButtonCallback}>
                    <ThemedText style={styles.interactText}>
                        {options.rightButtonText}
                    </ThemedText>
                </Pressable>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        height: 175,
        width: 400,
        top: "42.5%",
        borderRadius: 5,
        alignSelf: "center",
    },
    titleText: {
        flex: 1,
        marginTop: "4%",
        marginLeft: "5%",
        fontSize: 20,
        fontWeight: "bold"
    },
    interactText: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: "500"
    },
    interactPressable: {
        flex: 1,
        marginHorizontal: "10%",
    },
    interactBackground: {
        position: "absolute",
        right: 0,
        bottom: 0,
        height: "20%",
        width: "50%",
        marginVertical: "5%",
        flexDirection: "row",
    }
})

