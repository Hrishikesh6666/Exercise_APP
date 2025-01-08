import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../components/HomeScreen/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';

export default function Shop() {
  return (
    <>
      <Header />

      {/* Search Bar */}
      {/* <View style={styles.container}>
        <LinearGradient
          colors={['#FF9A8B', '#FF6A88', '#FF99AC']}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.gradientBackground}
        >
          <View style={styles.searchBar}>
            <AntDesign name="search1" size={24} color="#fff" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for products, categories..."
              placeholderTextColor="#ddd"
            />
          </View>
        </LinearGradient>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center', // Center the search bar horizontally
  },
  gradientBackground: {
    width: '90%', // Keep responsive width
    borderRadius: 30,
    padding: 3, // Add padding for the gradient border effect
    elevation: 5, // Subtle shadow for elevated look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333', // Darker color for the search input background
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff', // White text for a clean look
    marginLeft: 10,
  },
});
