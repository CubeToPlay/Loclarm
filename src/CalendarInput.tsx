import ThemedInput from "@/components/ThemedInput";
import { StyleSheet, View } from "react-native"
import { Action } from "./Input";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useState } from "react";

export interface CalendarInputAction extends Action {
    active: boolean,
    purpose: string,
    date: string,
    callback: (date : string) => void
}

export interface CalendarObject {
    day: number,      // day of month (1-31)
    month: number,    // month of year (1-12)
    year: number,  // year
    timestamp: number,   // UTC timestamp representing 00:00 AM of this date
    dateString: string // date formatted as 'YYYY-MM-DD' string
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
                <Calendar
                    onDayPress={(day : CalendarObject) => setSelected(day.dateString)}
                    markedDates={{ [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'} }}
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

