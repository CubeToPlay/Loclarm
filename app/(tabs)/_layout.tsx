import { useColorScheme } from '@/hooks/useColorScheme';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import React, { useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { Pressable, View, StyleSheet } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import AlarmsScreen from './index';
import MapScreen from './map';
import { ThemedView } from '@/components/ThemedView';
import TimeInput from '@/src/TimeInput';

export default function TabLayout() {    
    return (
        <View style={{flex: 1}}>
            <NavBar/>
            <BottomBar/>
        </View>
    );
}

function NavBar() {
    const timeInputEnabledState = useState(false);
    const timeInputValueState = useState<Array<number>>([]);

    const colorScheme = useColorScheme();

    return (
        <View style={{height: "100%"}}>
            <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarStyle: { backgroundColor: Colors.dark.viewBackground },
                tabBarLabelStyle: { textTransform: 'none' }
            }}>
                <Tab.Screen 
                    name='Alarms' 
                    children={() => <AlarmsScreen timeInputEnabledState={timeInputEnabledState} timeInputValueState={timeInputValueState}/>}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'alarm' : 'alarm-outline'} color={color} />
                        )
                    }}
                />
                <Tab.Screen 
                    name='Map' 
                    component={MapScreen}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
            <TimeInput timeInputEnabledState={timeInputEnabledState} timeInputValueState={timeInputValueState}/>
        </View>
    )
}

function BottomBar() {
    function onNewAlarmPress() {
        console.log("New Alarm");
    }

    function AddButton() {
        return (
            <View style={styles.addButton}>
                <Pressable onPress={onNewAlarmPress}>
                    <Ionicons name='add-circle-outline' size={50} color={Colors.dark.tabIconSelected}/>
                </Pressable>
            </View>
        )
    }

    return (
        <ThemedView style={styles.bottomTab}>
            <AddButton/>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    addButton: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    bottomTab: {
        position: "absolute",
        height: "7%",
        width: "100%",
        bottom: 0,
        zIndex: 0
    }
})