import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログイン（モバイル/汎用）</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>続ける</Text>
      </TouchableOpacity>
      <Text style={styles.help}>※ 仮の画面です。後で本実装に置き換えられます。</Text>
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
