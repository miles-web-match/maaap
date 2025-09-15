import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = { error: Error; reset: () => void };
export default function ErrorScreen({ error, reset }: Props) {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',padding:24}}>
      <Text style={{fontSize:18,fontWeight:'700',marginBottom:8}}>画面の表示でエラーが発生しました</Text>
      <Text style={{color:'#c00',marginBottom:16}}>{String(error?.message || error)}</Text>
      <TouchableOpacity onPress={reset} style={{backgroundColor:'#000',paddingHorizontal:16,paddingVertical:10,borderRadius:8}}>
        <Text style={{color:'#fff'}}>再読み込み</Text>
      </TouchableOpacity>
    </View>
  );
}
