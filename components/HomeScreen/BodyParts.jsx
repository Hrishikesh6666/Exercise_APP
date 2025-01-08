import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Exercise } from '../../constants';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useRouter } from 'expo-router';
import  {exer} from "../../app/ExerciseScreen/Exer"

export default function BodyParts() {
    return (
        <View className="mx-4">
            <Text style={{ fontSize: hp(3) }} className="font-bold text-neutral-700">
                Other Exercise
            </Text>

            <FlatList
                data={Exercise}
                numColumns={2}
                keyExtractor={(item) => item.name}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                }}
                renderItem={({ item, index }) => (
                    <BodypartCard router={router} index={index} item={item} />
                )}
            />
        </View>
    );
}

const BodypartCard = ({ item,router, index }) => {
    return (
        <TouchableOpacity
            onPress={()=>router.push({pathname:'/ExerciseScreen/Exer',params: item})}
            style={{
                width: wp(44),
                height: hp(35),
                borderRadius: 45,
                overflow: 'hidden', // Ensures child elements like Image and LinearGradient don't exceed the boundaries
                marginBottom: hp(2),
            }}
        >
            <Image
                source={item.image}
                resizeMode="cover"
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: hp(20), // Covers a significant portion for better text visibility
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    bottom: hp(2), // Positions text slightly above the bottom
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: hp(2.5),
                        color: 'white',
                        fontWeight: '600',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                    }}
                >
                    {item?.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
