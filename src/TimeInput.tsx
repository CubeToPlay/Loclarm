import React, { useState } from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";
import { Action } from "./Input";

export interface TimeInputAction extends Action {
    active: boolean,
    time: Array<number>,
    callback: (time : Array<number>) => void
}

export default function TimeInput( { action, update } : { action: TimeInputAction, update : () => void}) {
    if (!action.active) {
        return null;
    }
    
    const [amSelected, setAmSelected] = useState(true);
    const [hourSelected, setHourSelected] = useState(true);
    const [time, setTime] = useState([...action.time]);

    function Interact() {
        function onCancelPress() {
            action.callback([]);
            action.active = false
            update();
        }

        function onOkPress() {
            action.callback(time);
            action.active = false
            update();
        }

        return (
            <ThemedView style={styles.interact}>
                <ThemedPressable style={styles.interactButton} lightColor={Colors.light.keypadButtonBackground} darkColor={Colors.dark.keypadButtonBackground} onPress={onCancelPress}>
                    <ThemedText style={styles.interactButtonText}>
                        Cancel
                    </ThemedText>
                </ThemedPressable>
                <ThemedPressable style={styles.interactButton} lightColor={Colors.light.keypadButtonBackground} darkColor={Colors.dark.keypadButtonBackground} onPress={onOkPress}>
                    <ThemedText style={styles.interactButtonText}>
                        Ok
                    </ThemedText>
                </ThemedPressable>
            </ThemedView>
        )
    }

    function Keypad() {
        function KeypadButton( { number, children, style } : { number : number, children : string, style?: StyleProp<ViewStyle>} ) {
            function onPress() {
                const updatedTime = [...time];

                function insert(index : number, number: number) {
                    const temp = updatedTime[index];
                    updatedTime[index] = number;
                    updatedTime[index-1] = temp;
                }
            
                function remove(index : number) {
                    updatedTime[index] = updatedTime[index-1];
                    updatedTime[index-1] = 0
                }

                const index = hourSelected ? 1 : 3;
                const maximum = hourSelected ? 12 : 59;
                switch (number) {
                    case 10:
                        remove(index);
                        break;
                    default:
                        let full = updatedTime[hourSelected ? 0 : 2];
                        let value = updatedTime[hourSelected ? 1 : 3] * 10 + number;
                        if (maximum < value || full) { 
                            break; 
                        }
                        insert(index, number);
                        full = updatedTime[hourSelected ? 0 : 2];
                        value = updatedTime[hourSelected ? 1 : 3] * 10 + number;
                        if (maximum < value || full) { 
                            setHourSelected(!hourSelected); 
                        }
                        break;
                }
                
                setTime(updatedTime);
            }

            return (
                <ThemedPressable style={[styles.keypadButton, style]} onPress={onPress} lightColor={Colors.light.keypadButtonBackground} darkColor={Colors.dark.keypadButtonBackground}>
                    <ThemedText style={styles.keypadButtonText}>
                        {children}
                    </ThemedText>
                </ThemedPressable>
            )
        }

        return (
            <ThemedView style={styles.keypad}>
                <KeypadButton number={9} children="9"/>
                <KeypadButton number={8} children="8"/>
                <KeypadButton number={7} children="7"/>
                <KeypadButton number={6} children="6"/>
                <KeypadButton number={5} children="5"/>
                <KeypadButton number={4} children="4"/>
                <KeypadButton number={3} children="3"/>
                <KeypadButton number={2} children="2"/>
                <KeypadButton number={1} children="1"/>
                <KeypadButton number={10} children="<"/>
                <KeypadButton number={0} style={{width: 132}} children="0"/>
            </ThemedView>
        )
    }

    function Time() {
        function TimeBlock( { children, selected, onPress } : { children: string, selected: boolean, onPress: (event: GestureResponderEvent) => void } ) {
            return (
                <ThemedPressable style={styles.timeTextBlock} 
                lightColor={ selected ? Colors.light.timeBlockSelected : Colors.light.timeBlock } 
                darkColor={ selected ? Colors.dark.timeBlockSelected : Colors.dark.timeBlock }
                onPress={onPress}>
                    <ThemedText style={styles.timeText} lightColor={Colors.light.text} darkColor={Colors.dark.text}>
                        {children}
                    </ThemedText>
                </ThemedPressable>
            )
        }

        function LatinBlock( { children, selected, onPress } : { children: string, selected: boolean, onPress: (event: GestureResponderEvent) => void }) {
            return (
                <ThemedPressable style={styles.timeLatinBlock} 
                lightColor={ selected ? Colors.light.timeBlockSelected : Colors.light.timeBlock } 
                darkColor={ selected ? Colors.dark.timeBlockSelected : Colors.dark.timeBlock }
                onPress={onPress}>
                    <ThemedText style={styles.timeLatinText} lightColor={Colors.light.text} darkColor={Colors.dark.text}>
                        {children}
                    </ThemedText>
                </ThemedPressable>
            )
        }

        return (
            <ThemedView style={styles.time} lightColor={Colors.light.timeBackground} darkColor={Colors.dark.timeBackground}>
                <ThemedView style={styles.timeTextInput}>
                    <TimeBlock selected={hourSelected} onPress={() => setHourSelected(true)}>
                        {time[0].toString()+time[1].toString()}
                    </TimeBlock>
                    <ThemedText style={styles.timeTextColon} lightColor={Colors.light.text} darkColor={Colors.dark.text}>
                        :
                    </ThemedText>
                    <TimeBlock selected={!hourSelected} onPress={() => setHourSelected(false)}>
                        {time[2].toString()+time[3].toString()}
                    </TimeBlock>
                </ThemedView>
                <ThemedView style={styles.timeLatinInput}>
                    <ThemedView style={styles.timeLatinInputBackground} lightColor={Colors.light.timeBlock} darkColor={Colors.dark.timeBlock}>
                        <LatinBlock selected={amSelected} onPress={() => setAmSelected(true)}>
                            AM
                        </LatinBlock>
                        <LatinBlock selected={!amSelected} onPress={() => setAmSelected(false)}>
                            PM
                        </LatinBlock>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        )
    }

    return (
        <ThemedView style={styles.input} lightColor={Colors.light.timeInputBackground} darkColor={Colors.dark.timeInputBackground}>
            <Time/>
            <Keypad/>
            <Interact/>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    input: {
        position: "absolute",
        width: 300,
        height: 493,
        alignSelf: "center",
        bottom: "30%",
        borderRadius: 5
    },
    time: {
        height: 107,
        flexDirection: "row"
    },
    keypad: {
        flex: 1,
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0,0,0,0)",
    },
    interact: {
        alignSelf: "center",
        height: 30,
        width: 212,
        flexDirection: "row",
        marginBottom: 16
    },
    interactButton: {
        flex: 1
    },
    interactButtonText: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    timeTextBlock: {
        width: 90,
        height: 70,
        borderRadius: 5,
        alignSelf: "center"
    },
    timeText: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        paddingTop: 30,
        fontSize: 40,
    },
    timeTextInput: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "rgb(0,0,0,0)",
    },
    timeTextColon: {
        textAlign: "center",
        textAlignVertical: "center",
        width: 30,
        fontSize: 40,
        paddingTop: 20
    },
    timeLatinBlock:{
        flex: 1,
        borderRadius: 5
    },
    timeLatinInput: {
        flex: 0.25,
        backgroundColor: "rgb(0,0,0,0)",
        justifyContent: "center",
    },
    timeLatinInputBackground: {
        height: 70,
        width: 40,
        borderRadius: 5,
        marginLeft: 5
    },
    timeLatinText: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center"
    },
    keypadButton: {
        width: 50,
        height: 50,
        margin: 16,
        borderRadius: 5
    },
    keypadButtonText: {
        flex: 1,
        textAlignVertical: "center",
        textAlign: "center",
        paddingTop: 10,
        fontSize: 24,
    }
})