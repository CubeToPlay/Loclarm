import { useColorScheme } from '@/hooks/useColorScheme';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import { Tabs } from 'expo-router';

import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import AlarmsScreen from './index';
import MapScreen from './map';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            tabBarStyle: {
                backgroundColor: Colors.dark.tabBackground,
                paddingTop: '10%'
            },
            tabBarIconStyle: {
                width: '100%'
            },
            tabBarLabelStyle: {
                textTransform: 'none'
            }
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
        {/* <Tab.Screen
            name="index"
            options={{
            title: 'Alarms',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'alarm' : 'alarm-outline'} color={color} />
            ),
            }}
        />
        <Tab.Screen
            name="map"
            options={{
            title: 'Map',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
            ),
            }}
        /> */}
        </Tab.Navigator>
    );
}
