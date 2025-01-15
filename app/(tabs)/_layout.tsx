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
import { useThemeColor } from '@/hooks/useThemeColor';

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
            tabBarInactiveTintColor: useThemeColor({}, "tabIconDefault"),
            tabBarActiveTintColor: useThemeColor({}, "tabIconSelected"),
            tabBarStyle: [{ backgroundColor: useThemeColor({}, "viewBackground") }, styles.topTabBar],
            tabBarIndicatorStyle: [{ backgroundColor: useThemeColor({}, "tabIconSelected") }, styles.topTabIndicator]
        }}>
            <Tab.Screen 
                name='Alarms' 
                component={AlarmsScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'alarm' : 'alarm-outline'} color={color} />
                    ),
                    tabBarShowLabel: false,
                    tabBarItemStyle: styles.tabBarItem
                }}
            />
            <Tab.Screen 
                name='Map' 
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
                    ),
                    tabBarShowLabel: false,
                    tabBarItemStyle: styles.tabBarItem
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
                    <Ionicons name='add-circle-outline' size={50} color={useThemeColor({}, "tabIconSelected")}/>
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
    },
    topTabBar: {
        height: 70
    },
    topTabIndicator: {
        display: "none",
    },
    tabBarItem: {
        height: 70,
    }
})