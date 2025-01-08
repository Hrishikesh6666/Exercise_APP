import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'
export default function _layout() {
  return (
    <Tabs screenOptions={{headerShown:false}} tabBar={props =><TabBar{...props}/>}>
      <Tabs.Screen name ='home'/>
      <Tabs.Screen name ='shop'/>
      <Tabs.Screen name ='profile'/>
      <Stack>
        <Stack.Screen name='Exer' options={{
          presentation:'fullScreenModal'
        }}/>
      </Stack>
    </Tabs>
    
  )
}
