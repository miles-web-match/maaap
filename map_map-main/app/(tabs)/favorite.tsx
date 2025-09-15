import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Heart, Trash2 } from 'lucide-react-native';

type FavoriteSpot = { id:number; name:string; category:string; addedDate:string; };
const mockFavorites: FavoriteSpot[] = [
  { id:1, name:'清水寺', category:'観光地', addedDate:'2024-01-05' },
  { id:2, name:'富士山', category:'自然',   addedDate:'2024-01-10' },
];

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<FavoriteSpot[]>(mockFavorites);
  const removeFavorite = (id:number) => setFavorites(favorites.filter(i=>i.id!==id));

  return (
    <ScrollView contentContainerStyle={{ padding:16 }}>
      {favorites.map(f => (
        <View key={f.id} style={styles.card}>
          <View>
            <Text style={styles.name}>{f.name}</Text>
            <Text style={styles.meta}>{f.category}・追加日: {f.addedDate}</Text>
          </View>
          <TouchableOpacity onPress={() => removeFavorite(f.id)} style={styles.removeBtn}>
            <Trash2 size={18} color="#000" />
          </TouchableOpacity>
        </View>
      ))}
      {favorites.length===0 && (
        <View style={{ alignItems:'center', marginTop:32 }}>
          <Heart size={24} color="#999" />
          <Text style={{ color:'#999', marginTop:8 }}>お気に入りはまだありません</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderWidth:1, borderColor:'#eee', backgroundColor:'#fff', padding:16, borderRadius:16, marginBottom:12 },
  name:{ fontSize:16, fontWeight:'700' }, meta:{ color:'#666', marginTop:4 },
  removeBtn:{ padding:8, borderRadius:8, backgroundColor:'#f5f5f5' },
});
