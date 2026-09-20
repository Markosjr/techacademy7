import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { colors } from '@/theme';

export default function RootLayout() {
  return <SafeAreaProvider><AuthProvider><RootNavigator /></AuthProvider></SafeAreaProvider>;
}

function RootNavigator() {
  const { user, isRestoring } = useAuth();
  if (isRestoring) return <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background }}><ActivityIndicator color={colors.primary} /></View>;
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Protected guard={!user}><Stack.Screen name="(auth)" /></Stack.Protected>
    <Stack.Protected guard={!!user}><Stack.Screen name="(app)" /></Stack.Protected>
  </Stack>;
}
