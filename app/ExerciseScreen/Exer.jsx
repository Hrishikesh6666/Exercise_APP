import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import { Exercise } from '../../constants';
import { fetchExercisesByBodypart } from '../../api/exerciseDB';

export default function Exer() {
  const router = useRouter();
  const item = useLocalSearchParams();
  console.log('got item:', item);

  useEffect(() => {
    if (item) getExercises(item.name);
  }, [item]);

  const getExercises = async (Exercise) => {
    let data = await fetchExercisesByBodypart(Exercise);
    console.log('got data :', data);
  }

  return (
    <View className='mt-50'>
      <Text>Exer</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}