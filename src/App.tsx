import { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FetchAllPinsComponent } from './utils/FetchAllPinsComponent';

// メインの関数
function App() {
  // メニュー情報
  const [showMenu, setShowMenu] = useState(true);
  const [showMarker, setShowMarker] = useState(true);
  // 再レンダリング用の設定
  const [reloadState, setReloadState] = useState(true);
  const handleUpdate = () => {
    setReloadState(prevTrigger => !prevTrigger); // stateの更新で再レンダリングをトリガー
  };

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
    <MapContainer center={[35.6895, 139.6917]} zoom={15} style={{ height: '100vh', width: '100%'}} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FetchAllPinsComponent reloadState={reloadState} reload={handleUpdate} />
        <ZoomControl position="topright" />
    </MapContainer>
    </div>
  );
} 
export default App;
