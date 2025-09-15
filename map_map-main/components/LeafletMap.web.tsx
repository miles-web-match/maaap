import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

// LeafletのCSSはCDNから読み込み（Expo Webのビルドで安全）
function useLeafletCss() {
  useEffect(() => {
    const id = 'leaflet-css';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);
}

export default function LeafletMap({ height = 'calc(100vh - 220px)' }: { height?: number | string }) {
  useLeafletCss();

  // マーカー画像もCDNを明示
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  const apiKey = process.env.EXPO_PUBLIC_MAPTILER_KEY; // Cloudflare Pages の環境変数で入れる
  const center: [number, number] = [35.6762, 139.6503]; // 東京

  const tileUrl = apiKey
    ? `https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=${apiKey}`
    : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; // フォールバック（公開本番はMapTiler推奨）

  return (
    <div style={{ width: '100%', height }}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ width: '100%', height: '100%', borderRadius: 16 }}
        zoomControl={false}
        scrollWheelZoom
      >
        <TileLayer url={tileUrl} attribution="&copy; OpenStreetMap contributors & MapTiler" />
        <Marker position={center}>
          <Popup>
            <div>
              <strong>日本</strong>
              <div>緯度: {center[0]}, 経度: {center[1]}</div>
              <div>ズーム: 10</div>
            </div>
          </Popup>
        </Marker>
        <ZoomControl position="right" />
      </MapContainer>
    </div>
  );
}
