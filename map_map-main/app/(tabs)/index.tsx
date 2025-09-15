import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView,
  StyleSheet,
  Platform, // ★ 追加
} from 'react-native';
import { MapPin, X, Filter, Plus, Heart } from 'lucide-react-native';
import LeafletMap from '../../components/LeafletMap'; // ★ 追加（Webは .web.tsx、ネイティブはダミー .tsx が解決）

// Mock data
const mockSpots = [
  { id: 1, name: 'スポット1', description: '説明1', lat: 35.6762, lng: 139.6503 },
  { id: 2, name: 'スポット2', description: '説明2', lat: 35.6862, lng: 139.6603 },
];

const countries = [
  { code: 'JP', name: '日本', region: { latitude: 35.6762, longitude: 139.6503, latitudeDelta: 10, longitudeDelta: 10 } },
];

const japanPrefectures = [
  { name: '東京都', region: { latitude: 35.6762, longitude: 139.6503, latitudeDelta: 1, longitudeDelta: 1 } },
];

const regions = [
  { name: '関東', region: { latitude: 35.6762, longitude: 139.6503, latitudeDelta: 3, longitudeDelta: 3 } },
];

interface LocationFilter {
  country: string;
  prefecture?: string;
  region?: string;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface InteractiveMapViewProps {
  region: Region;
  onRegionChange: (region: Region) => void;
  spots: typeof mockSpots;
}

const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({ region, onRegionChange, spots }) => {
  const [selectedSpot, setSelectedSpot] = useState<typeof mockSpots[0] | null>(null);

  const isSpotVisible = (spot: typeof mockSpots[0]) => {
    const latDiff = Math.abs(spot.lat - region.latitude);
    const lngDiff = Math.abs(spot.lng - region.longitude);
    return latDiff <= region.latitudeDelta / 2 && lngDiff <= region.longitudeDelta / 2;
  };

  const getSpotPosition = (spot: typeof mockSpots[0]) => {
    const latPercent = (0.5 - (spot.lat - region.latitude) / region.latitudeDelta) * 100;
    const lngPercent = ((spot.lng - region.longitude) / region.longitudeDelta + 0.5) * 100;
    
    return {
      top: `${Math.max(5, Math.min(95, 100 - latPercent))}%`,
      left: `${Math.max(5, Math.min(95, lngPercent))}%`,
    };
  };

  return (
    <View style={styles.mapView}>
      {/* Map Background */}
      <View style={styles.mapBackground}>
        <Text style={styles.mapTitle}>地図表示エリア</Text>
        <Text style={styles.mapSubtitle}>
          {getFilterDisplayText({ country: '日本' })} - 緯度: {region.latitude.toFixed(4)}, 経度: {region.longitude.toFixed(4)}
        </Text>
        <Text style={styles.mapZoom}>ズーム範囲: {region.latitudeDelta.toFixed(2)}°</Text>
      </View>

      {/* Spots as markers */}
      {spots.filter(isSpotVisible).map((spot) => {
        const position = getSpotPosition(spot);
        return (
          <TouchableOpacity
            key={spot.id}
            style={[styles.mapMarker, { top: position.top, left: position.left }]}
            onPress={() => setSelectedSpot(spot)}
          >
            <MapPin size={24} color="#ff4757" />
          </TouchableOpacity>
        );
      })}

      {/* Info popup */}
      {selectedSpot && (
        <View style={styles.infoPopup}>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>{selectedSpot.name}</Text>
            <Text style={styles.infoDescription}>{selectedSpot.description}</Text>
            <TouchableOpacity
              style={styles.closeInfo}
              onPress={() => setSelectedSpot(null)}
            >
              <X size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Navigation controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => {
            const newRegion = {
              ...region,
              latitudeDelta: Math.max(0.1, region.latitudeDelta * 0.5),
              longitudeDelta: Math.max(0.1, region.longitudeDelta * 0.5),
            };
            onRegionChange(newRegion);
          }}
        >
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => {
            const newRegion = {
              ...region,
              latitudeDelta: Math.min(50, region.latitudeDelta * 2),
              longitudeDelta: Math.min(50, region.longitudeDelta * 2),
            };
            onRegionChange(newRegion);
          }}
        >
          <Text style={styles.controlText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SimpleMapView: React.FC<InteractiveMapViewProps> = ({ region, onRegionChange, spots }) => {
  const [selectedSpot, setSelectedSpot] = useState<typeof mockSpots[0] | null>(null);

  const isSpotVisible = (spot: typeof mockSpots[0]) => {
    const latDiff = Math.abs(spot.lat - region.latitude);
    const lngDiff = Math.abs(spot.lng - region.longitude);
    return latDiff <= region.latitudeDelta / 2 && lngDiff <= region.longitudeDelta / 2;
  };

  const getSpotPosition = (spot: typeof mockSpots[0]) => {
    const latPercent = (0.5 - (spot.lat - region.latitude) / region.latitudeDelta) * 100;
    const lngPercent = ((spot.lng - region.longitude) / region.longitudeDelta + 0.5) * 100;
    
    return {
      top: `${Math.max(5, Math.min(95, 100 - latPercent))}%`,
      left: `${Math.max(5, Math.min(95, lngPercent))}%`,
    };
  };

  return (
    <View style={styles.mapView}>
      {/* Map Background with grid pattern */}
      <View style={styles.mapBackground}>
        <View style={styles.mapGrid}>
          {Array.from({ length: 10 }, (_, i) => (
            <View key={`h-${i}`} style={[styles.gridLine, { top: `${i * 10}%`, width: '100%', height: 1 }]} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <View key={`v-${i}`} style={[styles.gridLine, { left: `${i * 10}%`, height: '100%', width: 1 }]} />
          ))}
        </View>
        
        {/* Region info overlay */}
        <View style={styles.regionInfo}>
          <Text style={styles.regionTitle}>{getFilterDisplayText({ country: '日本' })}</Text>
          <Text style={styles.regionCoords}>
            緯度: {region.latitude.toFixed(4)}, 経度: {region.longitude.toFixed(4)}
          </Text>
          <Text style={styles.regionZoom}>ズーム: {region.latitudeDelta.toFixed(2)}°</Text>
        </View>
      </View>

      {/* Spots as markers */}
      {spots.filter(isSpotVisible).map((spot) => {
        const position = getSpotPosition(spot);
        return (
          <TouchableOpacity
            key={spot.id}
            style={[styles.mapMarker, { top: position.top, left: position.left }]}
            onPress={() => setSelectedSpot(spot)}
          >
            <MapPin size={24} color="#ff4757" />
          </TouchableOpacity>
        );
      })}

      {/* Info popup */}
      {selectedSpot && (
        <View style={styles.infoPopup}>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>{selectedSpot.name}</Text>
            <Text style={styles.infoDescription}>{selectedSpot.description}</Text>
            <TouchableOpacity
              style={styles.closeInfo}
              onPress={() => setSelectedSpot(null)}
            >
              <X size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Navigation controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => {
            const newRegion = {
              ...region,
              latitudeDelta: Math.max(0.1, region.latitudeDelta * 0.5),
              longitudeDelta: Math.max(0.1, region.longitudeDelta * 0.5),
            };
            onRegionChange(newRegion);
          }}
        >
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => {
            const newRegion = {
              ...region,
              latitudeDelta: Math.min(50, region.latitudeDelta * 2),
              longitudeDelta: Math.min(50, region.longitudeDelta * 2),
            };
            onRegionChange(newRegion);
          }}
        >
          <Text style={styles.controlText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Buttons */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Plus size={20} color="#fff" />
          <Text style={styles.actionButtonText}>お店登録</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.favoriteButton]}>
          <Heart size={20} color="#fff" />
          <Text style={styles.actionButtonText}>お気に入り</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getFilterDisplayText = (filter: LocationFilter) => {
  if (filter.region) return filter.region;
  if (filter.prefecture) return filter.prefecture;
  return filter.country;
};

export default function MapScreen() {
  const [selectedFilter, setSelectedFilter] = useState<LocationFilter>({ country: '世界全体' });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });

  const handleRegionChange = (region: Region) => {
    setMapRegion(region);
  };

  const handleCountrySelect = (country: any) => {
    setSelectedFilter({ country: country.name });
    setMapRegion(country.region);
    setShowFilterModal(false);
  };

  const handlePrefectureSelect = (prefecture: any) => {
    setSelectedFilter({ country: '日本', prefecture: prefecture.name });
    setMapRegion(prefecture.region);
    setShowFilterModal(false);
  };

  const handleRegionSelect = (region: any) => {
    setSelectedFilter({ country: '日本', region: region.name });
    setMapRegion(region.region);
    setShowFilterModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top White Band */}
      <View style={styles.topBand}>
        <Text style={styles.title}>Map</Text>
        <TouchableOpacity 
          style={styles.regionButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Filter size={16} color="#666" />
          <Text style={styles.regionText}>{getFilterDisplayText(selectedFilter)}</Text>
        </TouchableOpacity>
      </View>

      {/* Map Area */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          // ★ Webでは本物の地図（Leaflet + MapTiler）。高さをしっかり確保。
          <LeafletMap height={'calc(100vh - 220px)'} />
        ) : (
          // ★ ネイティブ（iOS/Android）は既存の簡易表示のまま
          <SimpleMapView 
            region={mapRegion} 
            onRegionChange={handleRegionChange}
            spots={mockSpots}
          />
        )}
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>地域を選択</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFilterModal(false)}
            >
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Countries Section */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>国</Text>
              <TouchableOpacity
                style={styles.filterItem}
                onPress={() => {
                  setSelectedFilter({ country: '世界全体' });
                  setMapRegion({
                    latitude: 35.6762,
                    longitude: 139.6503,
                    latitudeDelta: 50,
                    longitudeDelta: 50,
                  });
                  setShowFilterModal(false);
                }}
              >
                <Text style={styles.filterItemText}>世界全体</Text>
              </TouchableOpacity>
              {countries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={styles.filterItem}
                  onPress={() => handleCountrySelect(country)}
                >
                  <Text style={styles.filterItemText}>{country.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Japan Prefectures Section */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>日本の都道府県</Text>
              {japanPrefectures.map((prefecture) => (
                <TouchableOpacity
                  key={prefecture.name}
                  style={styles.filterItem}
                  onPress={() => handlePrefectureSelect(prefecture)}
                >
                  <Text style={styles.filterItemText}>{prefecture.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Japan Regions Section */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>日本の地域</Text>
              {regions.map((region) => (
                <TouchableOpacity
                  key={region.name}
                  style={styles.filterItem}
                  onPress={() => handleRegionSelect(region)}
                >
                  <Text style={styles.filterItemText}>{region.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBand: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  regionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  regionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapView: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f0f8ff',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#4a90e2',
    margin: 8,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2c5aa0',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    opacity: 0.3,
  },
  regionInfo: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2c5aa0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  regionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  regionCoords: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  regionZoom: {
    fontSize: 12,
    color: '#888',
  },
  mapMarker: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoPopup: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    zIndex: 20,
  },
  infoContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  closeInfo: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  mapControls: {
    position: 'absolute',
    right: 20,
    top: 20,
    gap: 8,
  },
  controlButton: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  floatingButtons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoriteButton: {
    backgroundColor: '#ff4757',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  filterItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  filterItemText: {
    fontSize: 14,
    color: '#333',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 4,
  },
  mapZoom: {
    fontSize: 12,
    color: '#95a5a6',
  },
});
