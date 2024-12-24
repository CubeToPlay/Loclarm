import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { StyleSheet, FlatList, Pressable, View } from "react-native";

import { AlarmData } from "@/src/Alarm";
import AlarmItem from "@/src/AlarmItem";

export default function AlarmsScreen() {
  const testData : Array<AlarmData> = [
    {
      id: "alarm1",
      name: "Football", 
      enabled: true,
      custom: false,
      repeat: false,
      cron: "* * * * 2,3 *",
    },
    {
      id: "alarm2",
      name: "Leave for Bus", 
      enabled: false,
      custom: true,
      repeat: false,
      cron: "* * * * 2 *"
    },
    {
      id: "alarm3",
      name: "Taco Time", 
      enabled: true,
      custom: false,
      repeat: true,
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },

  alarmList: {
    flex: 1,
    marginTop: "0.5%",
    width: "100%",
    height: "100%",
  }
})