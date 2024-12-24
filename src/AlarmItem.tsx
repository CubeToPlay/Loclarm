import React from "react";

import { ThemedText, ThemedTextProps } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedCircle } from "@/components/ThemedCircle";
import { ThemedPressable } from "@/components/ThemedPressable";

import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, Pressable, GestureResponderEvent} from "react-native";

import { AlarmData } from "@/src/Alarm";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type AlarmItemProps = {
  data: AlarmData;
}

export default function AlarmItem( { data } : AlarmItemProps ) {
  const [opened, setOpened] = useState(false);
  const [enabled, setEnabled] = useState(data.enabled);

  return (
      <ThemedView style={[styles.item]} lightColor={Colors.light.alarmButtonBackground} darkColor={Colors.dark.alarmButtonBackground} >
        <ThemedPressable style={styles.displayArea} onPress={() => {setOpened(!opened)}}>
          <ThemedView style={styles.info}>
            <ThemedText 
            style={styles.nameText} 
            lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
            darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
              {opened ? <AntDesign name="edit" size={20}>  </AntDesign> : ""}
              {data.name}
              </ThemedText>
            <Pressable style={styles.timePressable} onPress={() => alert(`Change Alarm '${data.name}' Time`)}>
              <ThemedText 
              style={styles.timeText}
              lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
              darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
                7:30 AM
              </ThemedText>
            </Pressable>
            <ThemedText 
            style={styles.datesText}
            lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
            darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
              Mon, Wed
            </ThemedText>
          </ThemedView>
          <AlarmEnableButton enabled={enabled} setEnabled={setEnabled}/>
      </ThemedPressable>
      <CloseEditButton opened={opened} setOpened={setOpened}/>
    </ThemedView>
  )
}

function AlarmEnableButton( { enabled, setEnabled } : { enabled : boolean, setEnabled : React.Dispatch<React.SetStateAction<boolean>>}) {
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

function CloseEditButton( {opened, setOpened } : { opened : boolean,  setOpened : React.Dispatch<React.SetStateAction<boolean>> } ) {
  return (
    <ThemedView style={[styles.edit, {height: opened ? 250 : 0}]}>
      <ThemedView style={styles.editInteractArea}>
        <EditButton 
        icon={<MaterialCommunityIcons name="checkbox-blank-outline" size={25}/>}
        text="Repeat"/>
        <EditButton 
        icon={<MaterialCommunityIcons name="calendar-blank-outline" size={25}/>}
        text="Schedule"/>
        <EditButton 
        icon={<Ionicons name="location-outline" size={25}/>}
        text="Location"
        style={{paddingTop: "8%"}}/>
        <EditButton 
        icon={<Feather name="pause" size={25}/>}
        text="Pause alarm"/>
        <EditButton 
        icon={<MaterialIcons name="multitrack-audio" size={25}/>}
        text="Alarm sound"
        style={{paddingTop: "8%"}}/>
        <EditButton 
        icon={<MaterialCommunityIcons name="trash-can-outline" size={25}/>}
        text="Delete"/>
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

function EditButton({ onPress, icon, text, ...props }: ThemedTextProps & {icon : React.JSX.Element, text: string, onPress? : (event: GestureResponderEvent) => void}) {
  return (
    <Pressable style={styles.editButton} onPress={onPress}>
        <ThemedText style={{paddingTop: "5%"}} {...props}> {icon} </ThemedText>
        <ThemedText style={{textAlignVertical: "center"}} > {text} </ThemedText>
    </Pressable>
  )
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

  edit: {
    flex: 1,
    backgroundColor: "rgb (0, 0, 0, 0)"
  },

  editClosePressable: {
    position: "absolute",
    width: "100%",
    height: "15%",
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
    marginHorizontal: "5%",
    backgroundColor: "rgb (0, 0, 0, 0)"
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: "1%",
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