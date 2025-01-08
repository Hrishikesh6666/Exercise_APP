import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/HomeScreen/Header'
import ImageSlider from '../../components/HomeScreen/ImageSlider'
import BodyParts from '../../components/HomeScreen/BodyParts'
export default function home() {
  return (
    <>
    <View>
      <Header/>
    </View>
    <View>
      <ImageSlider/>
    </View>
    <View>
      <BodyParts/>
    </View>
    </>
  )
}