import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser, useAuth } from '@clerk/clerk-expo';

export default function Header() {
    const { user } = useUser();
    const { signOut } = useAuth(); // Import signOut function from Clerk

    const handleLogout = async () => {
        try {
            await signOut(); // Sign the user out
            alert('You have been logged out.');
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <View
            style={{
                padding: 15,
                paddingTop: 10,
                backgroundColor: '#f5f5f5', // Light gray background
                borderBottomWidth: 2, // Add subtle border at the bottom
                borderBottomColor: '#e0e0e0',
                flexDirection: 'row',
                justifyContent: 'space-between', // Space between content
                alignItems: 'center',
            }}
        >
            {/* Left Section - User Info */}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10, // Adjusted for better spacing
                }}
            >
                <Image
                    source={{ uri: user?.imageUrl }}
                    style={{
                        width: 50, // Slightly larger profile image
                        height: 50,
                        borderRadius: 25, // Fully round
                        borderWidth: 2, // Border around the image
                        borderColor: '#007AFF', // Accent color for border
                    }}
                />
                <View>
                    <Text
                        style={{
                            fontSize: 16, // Larger, clearer font
                            fontWeight: '600', // Semi-bold for emphasis
                            color: '#333', // Dark gray text
                        }}
                    >
                        {user?.fullName || 'Welcome!'}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: '#666', // Subtle text for secondary info
                        }}
                    >
                        {user?.emailAddress || 'Welcome'}
                    </Text>
                </View>
            </View>

            {/* Right Section - Logout Button */}
            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    backgroundColor: '#FF3B30', // Red background for logout
                    borderRadius: 20, // Rounded corners
                }}
            >
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#fff', // White text
                    }}
                >
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
}
