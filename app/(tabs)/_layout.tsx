import { useColorScheme } from '@/hooks/useColorScheme';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { Pressable, View, StyleSheet } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import AlarmsScreen from './index';
import MapScreen from './map';
import { ThemedView } from '@/components/ThemedView';
import Alarm from '@/src/Alarm';
import Input from '@/src/Input';
import { useNavigation } from '@react-navigation/native';

export default function TabLayout() {    
    return (
        <View style={{flex: 1}}>
            <NavBar/>
            <BottomBar/>
            <Input.Component/>
        </View>
    );
}

function NavBar() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    return (
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            tabBarStyle: { backgroundColor: Colors.dark.viewBackground },
            tabBarLabelStyle: { textTransform: 'none' }
        }}>
            <Tab.Screen 
                name='Alarms' 
                component={AlarmsScreen}
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
    )
}

function BottomBar() {
    function onNewAlarmPress() {
        Input.name("New Alarm", (name) => {
            if (name !== '') {
                Input.time([0, 0, 0, 0], (time) => {
                    if (time.length !== 0) {
                        Alarm.createAlarm(Alarm.newAlarm(name));
                    } else {
                        onNewAlarmPress();
                    }
                })
            }
        })
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
        height: 75,
        width: "100%",
    }
})