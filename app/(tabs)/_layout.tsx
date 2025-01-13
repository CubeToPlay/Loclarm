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
import TimeInput from '@/src/TimeInput';

export default function TabLayout() {
    function AddButton() {
        return (
            <View style={styles.addButton}>
                <Pressable onPress={() => alert("New Alarm")}>
                    <Ionicons name='add-circle-outline' size={50} color={Colors.dark.tabIconSelected}/>
                </Pressable>
            </View>
        )
    }
    
    function NavBar() {
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

    return (
        <View style={{flex: 1}}>
            <NavBar/>

            <ThemedView style={styles.bottomTab}>
                <AddButton/>
            </ThemedView>
            
            <TimeInput/>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    bottomTab: {
        height: "7%",
    }
})