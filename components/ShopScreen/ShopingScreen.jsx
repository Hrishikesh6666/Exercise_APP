import React, { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

const HomeScreen = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");

  // Horizontal Image Slider Data
  const imageSliderData = [
    "https://img.freepik.com/free-vector/hand-drawn-electronics-store-sale-banner-template_23-2151138129.jpg",
    "https://img.freepik.com/free-vector/hand-drawn-electronics-store-facebook-template_23-2151138109.jpg",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/special-offer-headphones-banner-design-template-dcc4def09d0d65327ccc7658aa0f6bd7_screen.jpg?ts=1692774059",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-shop-discount-on-top-brands-shop-now-design-template-4cf0690de8d5ea5ee3f0c622488fde7a_screen.jpg?ts=1608400366",
  ];

  // Categories Data
  const categories = [
    { name: "Electronics", icon: "devices" },
    { name: "Clothing", icon: "checkroom" },
    { name: "Accessories", icon: "watch" },
    { name: "Home", icon: "home" },
    { name: "Fitness", icon: "fitness-center" },
  ];

  // Featured Products Data
  const featuredProducts = [
    { id: 1, name: "Laptop Pro", price: 1299, imageUrl: "https://www.boat-lifestyle.com/cdn/shop/products/main-img3_600x.png?v=1616562632" },
    { id: 2, name: "Smartphone XL", price: 999, imageUrl: "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, name: "Running Shoes", price: 199, imageUrl: "https://i.guim.co.uk/img/media/18badfc0b64b09f917fd14bbe47d73fd92feeb27/189_335_5080_3048/master/5080.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1562112c7a64da36ae0a5e75075a0d12" },
  ];

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Icons name="search" size={24} color={colors.text} />
          <TextInput
            placeholder="Search collections"
            placeholderTextColor={colors.text + "80"}
            style={[styles.searchBarInput, { color: colors.text }]}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        {/* Horizontal Image Slider */}
        <FlatList
          data={imageSliderData}
          keyExtractor={(item, index) => `image-${index}`}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContainer}
        />

        {/* Categories Section */}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item, index) => `category-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryCard}>
                <Icons name={item.icon} size={28} color="#fff" />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
          />
        </View>

        {/* Featured Products Section */}
        <View style={{ paddingHorizontal: 24 }}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            keyExtractor={(item) => `featured-${item.id}`}
            renderItem={({ item }) => (
              <Card
                price={item.price}
                imageUrl={item.imageUrl}
                onPress={() => console.log(`Navigate to ${item.name}`)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

// Card Component
const Card = ({
  price,
  imageUrl,
  onPress,
}: {
  price: number;
  imageUrl: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        width: 150,
        height: 200,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  image: {
    width: 300,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
  sliderContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    borderRadius: 12,
    width: 100,
    height: 100,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
});

export default HomeScreen;
