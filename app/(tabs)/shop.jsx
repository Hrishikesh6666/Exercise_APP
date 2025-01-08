import { View, Text } from 'react-native'
import React from 'react'
import ProfileSearchBar from '../../components/ShopScreen/ProfileSearchBar'
import ShopingScreen from '../../components/ShopScreen/ShopingScreen'

export default function shop() {
  return (
    <>
    <View>
      <ProfileSearchBar/>
    </View>
    <View>
      <ShopingScreen/>
    </View>
    </>

  )
}