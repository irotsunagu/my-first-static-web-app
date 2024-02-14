import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// デフォルトのマーカーアイコンを規定
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// マーカーデータの型を規定
interface MarkerData {
  id: number;
  name: string;
  position: [number, number];
}

// データ取得できなかった場合のデフォルトデータを規定
const defaultMarkers: MarkerData[] = [
  { id: 1, name: 'おれんち', position: [35.6895, 139.6917] },
  // デフォルトのピン位置を追加
];

// メインの関数
function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [showMarker, setShowMarker] = useState(true);
  const [markers, setMarkers] = useState<MarkerData[]>(defaultMarkers);

  // 
  useEffect(() => {
    fetch('API_URL')
      .then(response => response.json())
      .then(data => setMarkers(data))
      .catch(() => setMarkers(defaultMarkers));
  }, []);

  return (
    <div>
      <div style={{position: 'absolute', left: '20px', top: '20px', zIndex: 1000, background: 'white', padding: '10px', fontWeight: 'bold', fontSize: '20px'}}>
        幻想マップ
      </div>
      {showMenu && (
        <div style={{position: 'absolute', left: '20px', bottom: '20px', zIndex: 1000, background: 'white', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <button onClick={() => setShowMarker(!showMarker)}>{showMarker ? 'ピンを隠す' : 'ピンを表示'}</button>
          <button onClick={() => setShowMenu(false)}>ー</button>
        </div>
      )}
      {!showMenu && (
        <button style={{position: 'absolute', left: '20px', bottom: '20px', zIndex: 1000}} onClick={() => setShowMenu(true)}>メニュー</button>
      )}
      <MapContainer center={[35.6895, 139.6917]} zoom={13} style={{ height: '100vh', width: '100vw' }} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        {showMarker && markers.map((marker) => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
