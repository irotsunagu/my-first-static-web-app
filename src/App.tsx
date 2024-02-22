import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MarkerPopup from './lib/MarkerPopup'; 
import {fetchPins,deletePin,updatePin} from './lib/PinApi'; 
import PinData from './lib/PinData';
import {AddPinComponent} from './lib/AddPinComponent'; 

// デフォルトのマーカーアイコンを規定
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


// メインの関数
function App() {
  // ピン情報
  const [pins, setPins] = useState<PinData[]>([]);
  // メニュー情報
  const [showMenu, setShowMenu] = useState(true);
  const [showMarker, setShowMarker] = useState(true);

  // ピン情報の取得
  useEffect(() => {
    fetchPins().then(setPins).catch(console.error);
  }, []);

  // レンダリング用に諸々の処理結果を含んだDOMを返却する
  return (
    <div>
      <div style={{position: 'absolute', left: '20px', top: '20px', zIndex: 1000, background: 'white', padding: '10px', fontWeight: 'bold', fontSize: '20px'}}>
        幻想マップsample
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
    <MapContainer center={[35.6895, 139.6917]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddPinComponent />
      {pins.map(pin => (
        <Marker           key={pin.id}
          position={[pin.latitude, pin.longitude]} >
          <MarkerPopup pin={pin} updatePin={updatePin} deletePin={deletePin} />
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
} 
export default App;
