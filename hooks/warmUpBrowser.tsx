import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Check platform to avoid web-related errors
    if (Platform.OS !== 'web') {
      WebBrowser.warmUpAsync().catch((err) => console.error('WebBrowser.warmUpAsync error:', err));
      return () => {
        WebBrowser.coolDownAsync().catch((err) => console.error('WebBrowser.coolDownAsync error:', err));
      };
    }
  }, []);
};