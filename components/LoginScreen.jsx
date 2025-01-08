import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '@/hooks/warmUpBrowser';
import * as WebBrowser from 'expo-web-browser';



if (Platform.OS !== 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        console.warn('Sign-in not completed.');
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  }, [startOAuthFlow]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('@/assets/images/Login1.jpeg')}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 }}>
        <Text style={{ fontSize: 80, fontWeight: 'bold', color: 'red', padding: 2 }}>FLEXFIT</Text>
        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
          Start your workout with us
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: 16,
            backgroundColor: 'blue',
            borderRadius: 25,
            marginTop: 20,
            width: '100%',
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
