import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { StyleSheet, FlatList} from "react-native";

import Alarm from "@/src/Alarm";
import AlarmItem from "@/src/AlarmItem";

import { useState } from "react";

export default function AlarmsScreen() {
  const [, forceReload] = useState(0);

  Alarm.useCallback(() => {
    forceReload(Math.random);
  })

  return (
    <ThemedView style={styles.container} lightColor={Colors.light.background} darkColor={Colors.dark.background}>
      <FlatList
        style={styles.alarmList}
        data={Alarm.getAllAlarms()}
        renderItem={({item}) => <AlarmItem alarm={item}/>}
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
  }
})