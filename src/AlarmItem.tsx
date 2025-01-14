import React, { useContext, useEffect, useRef, useState } from "react";

import { ThemedText, ThemedTextProps } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedCircle } from "@/components/ThemedCircle";
import { ThemedPressable } from "@/components/ThemedPressable";

import { Colors } from "@/constants/Colors";
import { StyleSheet, Pressable, GestureResponderEvent} from "react-native";

import Alarm, { AlarmData } from "@/src/Alarm";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { TimeInputProps } from "./TimeInput";

export type AlarmItemProps = TimeInputProps & {
  alarm: AlarmData;
}

export default function AlarmItem( { alarm, timeInputEnabledState, timeInputValueState } : AlarmItemProps ) {  
  const [enabled, setEnabled] = useState(alarm.enabled);
  const [repeat, setRepeat] = useState(alarm.repeat);
  const [custom, setCustom] = useState(alarm.custom);
  const [time, setTime] = useState([0, 0, 0, 0]);

  const [, setTimeInputEnabled] = timeInputEnabledState
  const [timeInputValue, setTimeInputValue] = timeInputValueState

  const [opened, setOpened] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const week = useRef([false, false, false, false, false, false, false]);

  useEffect(() => {
    alarm.custom = custom;
    alarm.enabled = enabled;
    alarm.repeat = repeat;
    Alarm.updateAlarm(alarm);
    Alarm.store();
  }, [enabled, repeat, custom, time])

  useEffect(() => {
    if (trigger) {
      if (timeInputValue.length === 0) {
        setTrigger(false);
      } else if (!isEqual(time, timeInputValue)) {
        setTrigger(false);
        setTime(timeInputValue);
      }  
    }
  }, [timeInputValue]);

  return (
      <ThemedView style={[styles.item]} lightColor={Colors.light.alarmButtonBackground} darkColor={Colors.dark.alarmButtonBackground} >
        <ThemedPressable style={styles.displayArea} onPress={() => {setOpened(!opened)}}>
          <ThemedView style={styles.info}>
            <ThemedText 
            style={styles.nameText} 
            lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
            darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
              {opened ? <AntDesign name="edit" size={20}>  </AntDesign> : ""}
              {alarm.name}
              </ThemedText>
            <Pressable style={styles.timePressable} onPress={onTimeEditPress}>
              <ThemedText 
              style={styles.timeText}
              lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
              darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
                {(time[0] * 10 + time[1]).toString()}:{time[2].toString()+time[3].toString()} AM
              </ThemedText>
            </Pressable>
            <ThemedText 
            style={styles.datesText}
            lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
            darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
              Mon, Wed
            </ThemedText>
          </ThemedView>
          <AlarmEnableButton/>
      </ThemedPressable>
      <EditMenu/>
    </ThemedView>
  )

  function AlarmEnableButton() {
    return (
        <Pressable style={styles.enableButton} onPress={() => setEnabled(!enabled)}>
          <ThemedView 
            style={styles.enableButtonBacking} 
            lightColor={enabled ? Colors.light.alarmEnabled : Colors.light.alarmDisabled}
            darkColor={enabled ? Colors.dark.alarmEnabled : Colors.dark.alarmDisabled}
          >
            <ThemedCircle size={30} lightColor="#ffffff" darkColor="#ffffff" style={{left: enabled ? "50%" : 0}}/>
          </ThemedView>
        </Pressable>
    )
  }

  function EditMenu() {
    const menuSize = opened ? 300 : 0;
    const weekMenuSize = repeat ? menuSize * 0.15 : 0;
  
    return (
      <ThemedView style={[styles.editMenu, {height: menuSize + weekMenuSize}]}>
        <ThemedView style={styles.editInteractArea}>
          <EditButton 
          icon={<MaterialCommunityIcons name={repeat ? "checkbox-outline" : "checkbox-blank-outline"} size={25}/>}
          text="Repeat"
          onPress={() => setRepeat(!repeat)}>
          </EditButton>
          <Pressable style={[styles.customButton, {display: repeat ? "flex" : "none"}]} onPress={() => {alert("Custom"); setCustom(!custom)}}>
            <ThemedText style={{fontWeight: "500"}} lightColor={Colors.light.repeatCustomText} darkColor={Colors.dark.repeatCustomText}>
              Custom
            </ThemedText>
          </Pressable>
          <RepeatMenu repeat={repeat} size={weekMenuSize} opacity={custom ? 0.5 : 1}/>
          <EditButton 
          icon={<MaterialCommunityIcons name="calendar-blank-outline" size={25}/>}
          text="Schedule"
          onPress={() => alert("Schedule")}/>
          <EditButton 
          icon={<Ionicons name="location-outline" size={25}/>}
          text="Location"
          onPress={() => alert("Location")}/>
          <EditButton 
          icon={<Feather name="pause" size={25}/>}
          text="Pause alarm"
          onPress={() => alert("Pause alarm")}/>
          <EditButton 
          icon={<MaterialIcons name="multitrack-audio" size={25}/>}
          text="Alarm sound"
          onPress={() => alert("Alarm sound")}/>
          <EditButton 
          icon={<MaterialCommunityIcons name="trash-can-outline" size={25}/>}
          text="Delete"
          onPress={() => alert("Delete")}/>
        </ThemedView>
  
        <ThemedPressable 
        style={styles.editClosePressable} 
        lightColor={Colors.light.alarmCloseEditButtonBackground} 
        darkColor={Colors.dark.alarmCloseEditButtonBackground} 
        onPress={() => setOpened(false)}>
          <ThemedText style={styles.editCloseIcon}>
            <AntDesign name="caretup" size={15}/>
          </ThemedText>
        </ThemedPressable>
      </ThemedView>
    )
  }
  
  function RepeatMenu({ repeat, size, opacity} : {repeat: boolean, size: number, opacity: number}) {
    return (
      <ThemedView style={[styles.repeatMenu, {marginTop: repeat ? "1%" : 0, opacity: opacity}]}>
        <WeekButton number={0} size={size} text="S"/>
        <WeekButton number={1} size={size} text="M"/>
        <WeekButton number={2} size={size} text="T"/>
        <WeekButton number={3} size={size} text="W"/>
        <WeekButton number={4} size={size} text="T"/>
        <WeekButton number={5} size={size} text="F"/>
        <WeekButton number={6} size={size} text="S"/>
      </ThemedView>
    )
  }
  
  function EditButton({ onPress, icon, text, ...props }: ThemedTextProps & {icon : React.JSX.Element, text: string, onPress? : (event: GestureResponderEvent) => void}) {
    return (
      <Pressable style={styles.editButton} onPress={onPress}>
          <ThemedText style={{paddingTop: "0.5%"}} {...props}>{icon}</ThemedText>
          <ThemedText style={{textAlignVertical: "top", fontWeight: "500"}} >  {text}</ThemedText>
      </Pressable>
    )
  }
  
  function WeekButton ({ text, number, size } : {text: string, number: number, size: number }) {
    const [active, setActive] = useState(week.current[number]);

    return (
      <Pressable style={styles.weekButton} onPress={() => {setActive(!active); week.current[number] = !week.current[number]}}>
        <ThemedCircle
        style={{alignSelf: "center"}}
        size={size} 
        lightColor={week.current[number] ? Colors.light.weekButtonEnabled : Colors.light.weekButtonDisabled}
        darkColor={week.current[number] ? Colors.dark.weekButtonEnabled : Colors.dark.weekButtonDisabled}>
          <ThemedText style={styles.weekButtonText}>{text}</ThemedText>
        </ThemedCircle>
      </Pressable>
    )
  }

  function onTimeEditPress() {
    setTimeInputValue([...time]);
    setTimeInputEnabled(true);
    setTrigger(true);
  }
}

function isEqual(a : Array<number>, b: Array<number>) : boolean {
  if (a.length != b.length) return false;
  
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      return false
    }
  }

  return true;
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    marginHorizontal: "1%",
    marginTop: "1%",
    overflow: "hidden",
    borderRadius: 6,
  },

  displayArea: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "rgb (0, 0, 0, 0)"
  },

  info: {
    flex: 1,
    marginLeft: "5%",
    marginTop: "2%",
    height: "10%",
    backgroundColor: "rgb (0, 0, 0, 0)"
  },

  editMenu: {
    flex: 1,
    backgroundColor: "rgb (0, 0, 0, 0)"
  },

  editClosePressable: {
    position: "absolute",
    width: "100%",
    height: "12%",
    bottom: 0,
    borderRadius: 5,
  },
  editCloseIcon: {
    flex: 1,
    alignSelf: "center",
    textAlignVertical: "center",
  },
  editInteractArea: {
    position: "absolute",
    bottom: "18%",
    top: 0,
    right: "5%",
    left: "5%",
    backgroundColor: "rgb (0, 0, 0, 0)"
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: "1%",
  },

  repeatMenu: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "rgb(0 0 0 0)"
  },
  weekButton: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  weekButtonText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "500"
  },

  customButton: {
    height: "15%",
    position: "absolute", 
    right: "-1%",
    margin: "1%", 
    paddingRight: "2%",
    paddingLeft: "5%",
    // backgroundColor: "#ff0000"
  },

  nameText: {
    flex: 1,
    fontSize: 22.5,
  },
  timePressable: {
    flex: 1,
    paddingTop: "2%",
    width: "50%"
  },
  timeText: {
    paddingTop: "4%",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 32
  },
  datesText: {
    flex: 1,
    fontSize: 20,
  },

  enableButton: {
    flex: 0.2,
    paddingRight: "5%",
    paddingVertical: "8%",
  },
  enableButtonBacking: {
    height: 30,
    width: 60,
    borderRadius: 15,
  },
})