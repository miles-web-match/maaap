import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { Eye, EyeOff, MapPin } from 'lucide-react-native';
import { useAuth } from '@/providers/AuthProvider';
const { height } = Dimensions.get('window');

export default function SignupScreen() {
  const { signUp, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);

  const onSubmit = async () => {
    try { await signUp(email.trim(), pw, username.trim()); router.replace('/(tabs)'); }
    catch (e: any) { Alert.alert('登録失敗', e.message ?? '不明なエラー'); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoRow}><MapPin size={40} color="#000" /><Text style={styles.title}>WhiteMap</Text></View>
        <Text style={styles.subtitle}>新規アカウント作成</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>ユーザー名</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} />

        <Text style={[styles.label,{marginTop:12}]}>メールアドレス</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

        <Text style={[styles.label,{marginTop:12}]}>パスワード</Text>
        <View style={{ flexDirection:'row', alignItems:'center' }}>
          <TextInput style={[styles.input,{flex:1}]} value={pw} onChangeText={setPw} secureTextEntry={!showPw} />
          <TouchableOpacity onPress={() => setShowPw(s=>!s)} style={{ padding:8 }}>
            {showPw ? <EyeOff size={20} color="#000" /> : <Eye size={20} color="#000" />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submit} onPress={onSubmit} disabled={loading}>
          <Text style={styles.submitText}>{loading ? '処理中...' : '登録する'}</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>既にアカウントがありますか？</Text>
          <Link href="/(auth)/login" style={styles.link}> ログイン</Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:24, paddingTop:Math.max(24,height*0.08), backgroundColor:'#fff' },
  header:{ marginBottom:24 }, logoRow:{ flexDirection:'row', alignItems:'center', gap:8, marginBottom:8 },
  title:{ fontSize:28, fontWeight:'800' }, subtitle:{ color:'#666' },
  form:{}, label:{ color:'#333', marginBottom:6 }, input:{ borderWidth:1, borderColor:'#e5e5e5', borderRadius:12, padding:12 },
  submit:{ marginTop:16, backgroundColor:'#000', borderRadius:12, alignItems:'center', paddingVertical:14 },
  submitText:{ color:'#fff', fontWeight:'700' },
  row:{ flexDirection:'row', justifyContent:'center', marginTop:24 }, link:{ color:'#000', fontWeight:'600' },
});
