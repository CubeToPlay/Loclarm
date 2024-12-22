import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Pressable, View } from "react-native";

interface AlarmData {
  id: string,
  name: string,
  enabled: boolean,
  cron: string,
};

export default function AlarmsScreen() {
  const testData : Array<AlarmData> = [
    {
      id: "alarm1",
      name: "Football", 
      enabled: true,
      cron: "* * * * 2,3 *",
    },
    {
      id: "alarm2",
      name: "Leave for Bus", 
      enabled: false,
      cron: "* * * * 2 *"
    },
    {
      id: "alarm3",
      name: "Taco Time", 
      enabled: true,
      cron: "* * * * 0 *"
    }
  ]

  return (
    <ThemedView style={styles.container} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
      <FlatList
        style={styles.alarmList}
        data={testData}
        renderItem={({item}) => <AlarmItem data={item}/>}
        keyExtractor={item => item.id}
      />
    </ThemedView>
  );
}

function AlarmItem( { data } : { data: AlarmData} ) {
  const [alarm, setAlarm] = useState(data);
  const [enabled, setEnabled] = useState(alarm.enabled);

  useEffect(() => {
    alarm.enabled = enabled;
    setAlarm(alarm);
  }, [enabled])

  return (
    <Pressable onPress={() => alert(`Open Alarm '${alarm.name}'`)}>
      <ThemedView style={styles.alarmItem} lightColor={Colors.light.alarmButtonBackground} darkColor={Colors.dark.alarmButtonBackground}>
        <ThemedText 
          style={styles.alarmNameText} 
          lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
          darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
            {alarm.name}
        </ThemedText>
        <Pressable style={{position: "relative", top: "42%"}} onPress={() => alert(`Change Alarm '${alarm.name}' Time`)}>
          <ThemedText 
          style={styles.alarmTimeText}
          lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
          darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
            {"7:30 AM"}
          </ThemedText>
        </Pressable>
        <ThemedText 
        style={styles.alarmDatesText}
        lightColor={enabled ? Colors.light.buttonText : Colors.light.buttonDisabledText} 
        darkColor={enabled ? Colors.dark.buttonText : Colors.dark.buttonDisabledText}>
          {"Mon, Wed"}
        </ThemedText>
        <AlarmEnableButton enabled={enabled} setEnabled={setEnabled}/>
      </ThemedView>
    </Pressable>
  )
}

function AlarmEnableButton( { enabled, setEnabled } : { enabled : boolean, setEnabled : React.Dispatch<React.SetStateAction<boolean>>}) {

  return (
    <View style={styles.alarmEnableButton}>
      <Pressable style={{width: "100%", height: "100%"}} onPress={() => setEnabled(!enabled)}>
        <ThemedView 
          style={{position: "relative", height: "90%", top: '5%', borderRadius: 20}} 
          lightColor={enabled ? Colors.light.alarmEnabled : Colors.light.alarmDisabled}
          darkColor={enabled ? Colors.dark.alarmEnabled : Colors.dark.alarmDisabled}
        />

        <View style={{position: "absolute", backgroundColor: "#fff", width: "50%", height: "100%", borderRadius: "50%", left: enabled ? "50%" : "0%"}} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  alarmList: {
    flex: 1,
    marginTop: "2%",
    width: "100%"
  },
  alarmItem: {
    width: "95%",
    height: 125,
    marginTop: "1%",
    borderRadius: 6,
    alignSelf: "center",
  },
  alarmNameText: {
    position: "absolute",
    left: "5%",
    marginTop: "3%",
    fontSize: 22.5,
  },
  alarmTimeText: {
    position: "absolute",
    left: "5%",
    paddingTop: "3%",
    fontSize: 37.5,
    fontWeight: "500"
  },
  alarmDatesText: {
    position: "absolute",
    left: "5%",
    bottom: "5%",
    fontSize: 20,
  },
  alarmLocationText: {
    position: "absolute",
    marginTop: "3%",
    right: "5%",
    fontSize: 22.5,
  },

  alarmEnableButton: {
    position: "absolute",
    height: "30%",
    width: "17.5%",
    right: "5%",
    top: "40%",
  }
})