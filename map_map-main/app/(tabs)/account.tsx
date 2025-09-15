import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { User as UserIcon, Mail, LogOut } from 'lucide-react-native';
import { useAuth } from '@/providers/AuthProvider';
import { router } from 'expo-router';

export default function AccountScreen() {
  const { user, signOut } = useAuth();

  const onSignOut = async () => {
    await signOut();
    Alert.alert('ログアウトしました');
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff' }}>
      <ScrollView contentContainerStyle={{ padding:16 }}>
        <View style={styles.card}>
          <UserIcon size={28} color="#000" />
          <View style={{ marginLeft:12 }}>
            <Text style={{ fontSize:16, fontWeight:'700' }}>{user?.username ?? 'ゲスト'}</Text>
            <View style={{ flexDirection:'row', alignItems:'center', marginTop:4 }}>
              <Mail size={16} color="#000" /><Text style={{ marginLeft:6 }}>{user?.email ?? '未ログイン'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={onSignOut} style={styles.logout}>
          <LogOut size={18} color="#000" /><Text style={{ marginLeft:8, fontWeight:'700' }}>ログアウト</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card:{ flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:'#eee', backgroundColor:'#fff', padding:16, borderRadius:16 },
  logout:{ marginTop:16, alignSelf:'flex-start', flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:14, borderRadius:10, backgroundColor:'#f5f5f5' },
});
