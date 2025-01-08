import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, StyleSheet, Text, Animated } from 'react-native';
import { bodyParts } from '@/constants'; // Ensure this path is correct
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const ImageSlider = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / wp(70)); // Adjust based on card width
    setCurrentIndex(index);
  };

  const renderBodyPartCard = ({ item, index }) => (
    <BodyPartCard router={router} item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bodyParts}
        keyExtractor={(item) => item.name} // Ensure names are unique
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderBodyPartCard}
        pagingEnabled // Ensures snapping effect
        scrollEventThrottle={16} // Smooth scrolling
      />
      {/* Progress Indicator */}
      <View style={styles.indicatorContainer}>
        {bodyParts.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const BodyPartCard = ({ item, router, index }) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { transform: [{ scale: scaleValue }] },
      ]}
    >
      <TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => router.push({ pathname: '/ExerciseScreen/exercise', params: item })}
        style={styles.card}
      >
        {/* Exercise Image with Gradient */}
        <Image
          source={item.image}
          
          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradientOverlay}
        >
          <Text style={styles.exerciseName}>{item.name}</Text>
        </LinearGradient>
        {/* Difficulty Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.level || 'Calorie'}</Text>
        </View>
      </TouchableOpacity>
      {/* Action Button */}
      {/* <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>View Details</Text>
      </TouchableOpacity> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
  cardContainer: {
    marginRight: 16,
  },
  card: {
    width: wp(70),
    height: hp(30),
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    justifyContent: 'flex-end',
    padding: 10,
    resizeMode:'cover'
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6F61',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButton: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FF6F61',
  },
});

export default ImageSlider;
