import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, Modal } from 'react-native';
import { Filter, MapPin, Star, Clock, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type TouristSpot = { id:number; name:string; prefecture:string; description:string; rating:number; category:string; };

const mockData: TouristSpot[] = [
  { id:1, name:'清水寺', prefecture:'京都府', description:'世界文化遺産の有名な寺院。四季折々の景観が楽しめます。', rating:4.8, category:'文化・歴史' },
  { id:2, name:'富士山', prefecture:'静岡県', description:'日本の象徴的な山で、世界遺産に登録。', rating:4.9, category:'自然' },
  { id:3, name:'金沢21世紀美術館', prefecture:'石川県', description:'現代アートを中心とした人気の美術館。', rating:4.5, category:'アート' },
];

export default function NewsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('全国');
  const [spots, setSpots] = useState<TouristSpot[]>(mockData);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filters = ['全国', '自然', '文化・歴史', 'アート'];
  const applyFilter = (f: string) => { setSelectedFilter(f); setSpots(f==='全国'?mockData:mockData.filter(s=>s.category===f)); setShowFilterModal(false); };

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>おすすめスポット</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
          <Filter size={18} color="#000" /><Text style={styles.filterText}>{selectedFilter}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding:16 }}>
        {spots.map((s) => (
          <View key={s.id} style={styles.card}>
            <View style={styles.cardHeader}><MapPin size={16} color="#000" /><Text style={styles.pref}>{s.prefecture}</Text></View>
            <Text style={styles.name}>{s.name}</Text>
            <Text style={styles.desc}>{s.description}</Text>
            <View style={styles.metaRow}>
              <View style={styles.row}><Star size={16} color="#000" /><Text>{s.rating.toFixed(1)}</Text></View>
              <View style={styles.row}><Clock size={16} color="#000" /><Text>人気上昇中</Text></View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={showFilterModal} animationType="slide" transparent onRequestClose={() => setShowFilterModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>フィルター</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}><X size={20} color="#000" /></TouchableOpacity>
            </View>
            {filters.map((f) => (
              <TouchableOpacity key={f} style={styles.filterItem} onPress={() => applyFilter(f)}>
                <Text style={styles.filterLabel}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header:{ paddingHorizontal:16, paddingVertical:12, borderBottomWidth:1, borderBottomColor:'#eee', backgroundColor:'#fff', flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  headerTitle:{ fontSize:18, fontWeight:'800', color:'#000' },
  filterButton:{ flexDirection:'row', gap:6, alignItems:'center', paddingHorizontal:12, paddingVertical:8, borderRadius:999, backgroundColor:'#f5f5f5' },
  filterText:{ fontSize:13, color:'#000' },
  card:{ width: width-32, backgroundColor:'#fff', borderWidth:1, borderColor:'#eee', borderRadius:16, padding:16, marginBottom:14, shadowColor:'#000', shadowOpacity:0.03, shadowRadius:8, shadowOffset:{ width:0, height:2 } },
  cardHeader:{ flexDirection:'row', alignItems:'center', gap:6, marginBottom:8 }, pref:{ fontSize:12, color:'#555' },
  name:{ fontSize:18, fontWeight:'700', color:'#000', marginBottom:6 }, desc:{ fontSize:14, color:'#333' },
  metaRow:{ marginTop:12, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }, row:{ flexDirection:'row', alignItems:'center', gap:6 },
  modalOverlay:{ flex:1, backgroundColor:'rgba(0,0,0,0.2)', justifyContent:'flex-end' }, modalSheet:{ backgroundColor:'#fff', padding:16, borderTopLeftRadius:20, borderTopRightRadius:20 },
  modalHeader:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:12 }, modalTitle:{ fontSize:16, fontWeight:'700', color:'#000' },
  filterItem:{ paddingVertical:12, paddingHorizontal:8, borderBottomWidth:1, borderBottomColor:'#f3f3f3' }, filterLabel:{ fontSize:14, color:'#000' },
});
