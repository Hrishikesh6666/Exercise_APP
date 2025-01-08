import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function UserIntro() {
    const { user } = useUser();

    return (
        <>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 30
            }}
            >
                <Image source={{ uri: user?.imageUrl }}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 60
                    }}
                />
                <Text style={{
                    foutFamily: 'outfit-bold',
                    fontSize:15,
                    fontWeight:'bold'
                    
                }}>
                    {user?.fullName}
                </Text>
                <Text>
                    {user?.primaryEmailAddress?.emailAddress}
                </Text>
            </View>

        </>
    )
} 