import ThemedInput from "@/components/ThemedInput";
import { StyleSheet, View } from "react-native"
import { Action } from "./Input";
import { Calendar, DateData } from 'react-native-calendars';
import { useState } from "react";
import { ThemedCalendar } from "@/components/ThemedCalendar";

export interface CalendarInputAction extends Action {
    active: boolean,
    purpose: string,
    date: string,
    callback: (date : string) => void
}

export default function CalendarInput( { action, update } : { action: CalendarInputAction, update : () => void}) {
    if (!action.active) {
        return null;
    }

    const [selected, setSelected] = useState(action.date);
    
    function close() {
        action.active = false;
        update();
    }

    function onOk() {
        action.callback(selected);
        close();
    }

    return (
        <ThemedInput 
        options={{
            title: action.purpose,
            leftButtonText: "Cancel",
            leftButtonCallback: close,
            rightButtonText: "Ok",
            rightButtonCallback: onOk,
        }}
        viewStyle={{height: "43%", top: "30%"}}
        interactStyle={{marginBottom: "-2%"}}>
            <View style={styles.inputBackground}>
                <ThemedCalendar
                    onDayPress={(day : DateData) => setSelected(day.dateString)}
                    markedDates={{ [selected]: {selected: true, disableTouchEvent: true} }}
                />
            </View>
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
        alignSelf: "center",
        marginTop: "17%"
    }
})

