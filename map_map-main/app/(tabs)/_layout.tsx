import { Tabs } from 'expo-router';
import { MapPin, Newspaper, Heart, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e5e5', height: 88 },
        tabBarLabelStyle: { marginBottom: 8 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Map', tabBarIcon: ({ size, color }) => <MapPin size={size} color={color} /> }} />
      <Tabs.Screen name="news" options={{ title: 'News', tabBarIcon: ({ size, color }) => <Newspaper size={size} color={color} /> }} />
      <Tabs.Screen name="favorite" options={{ title: 'Favorite', tabBarIcon: ({ size, color }) => <Heart size={size} color={color} /> }} />
      <Tabs.Screen name="account" options={{ title: 'Account', tabBarIcon: ({ size, color }) => <User size={size} color={color} /> }} />
    </Tabs>
  );
}
