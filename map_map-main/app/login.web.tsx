import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function LoginWeb() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログイン</Text>
      {/* Webはまず確実にホームへ遷移（本実装は後で差し替え） */}
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>ログイン（Web簡易）</Text>
      </TouchableOpacity>
      <Text style={styles.help}>※ まず白画面回避。あとで本物のログインに置換します。</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',gap:16,padding:24},
  title:{fontSize:24,fontWeight:'700'},
  button:{backgroundColor:'#000',paddingHorizontal:16,paddingVertical:12,borderRadius:8},
  buttonText:{color:'#fff',fontWeight:'600'},
  help:{color:'#666',fontSize:12,textAlign:'center',marginTop:8},
});
