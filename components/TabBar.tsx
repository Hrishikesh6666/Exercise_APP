import { View, Platform, StyleSheet, Dimensions } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import Feather from '@expo/vector-icons/Feather';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const screenWidth = Dimensions.get('window').width;

  // Define icons for each route
  const icon = {
    home: (props: any) => <Feather name="home" size={24} {...props} />,
    shop: (props: any) => <Feather name="shopping-cart" size={24} {...props} />, // Changed "Shop" to "shop"
    profile: (props: any) => <Feather name="user" size={24} {...props} />,      // Changed "Profile" to "profile"
  };

  return (
    <View style={[styles.tabbar, { width: screenWidth * 0.8 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Debugging: Log the route name if the icon is undefined
        if (!icon[route.name]) {
          console.warn(`No icon defined for route: ${route.name}`);
        }

        const renderIcon = icon[route.name]
          ? icon[route.name]
          : (props: any) => <Feather name="help-circle" size={24} {...props} />;

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID || `tab-${route.name}`}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {renderIcon({ color: isFocused ? colors.primary : colors.text })}
            <Text style={{ color: isFocused ? colors.primary : colors.text, fontSize: 12 }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 5, // For Android shadow
    
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
