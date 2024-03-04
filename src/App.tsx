import { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FetchAllPinsComponent } from './containers/FetchAllPinsComponent';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import PinDropIcon from '@mui/icons-material/PinDrop';
import { IconButton } from '@mui/material';
import titleImg from './assets/title.png';

/**
 * メインのコンポーネント
 * @returns 画面に表示するDOM
 */
function App() {
  // ピンを全部出すか出さないかの状態管理state
  const [showMarker, setShowMarker] = useState(true);
  // 再レンダリング用の状態管理state
  const [reloadState, setReloadState] = useState(true);
  const handleUpdate = () => {
    setReloadState(prevTrigger => !prevTrigger); // stateの更新で再レンダリングをトリガー
  };

  // レンダリング用に諸々の処理結果を含んだDOMを返却する
  return (
    <div>
      <div style={{position: 'absolute', left: '20px', top: '20px', zIndex: 1000, padding: '10px', fontWeight: 'bold', fontSize: '20px'}}>
        <img src={titleImg} alt="title" style={{ width: '200px', height: 'auto', fontWeight: 'bold', fontSize: '20px'}} />
      </div>
      {/* <div style={{position: 'absolute', left: '10px', bottom: '12px', zIndex: 1000, background: 'white', padding: '5px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <IconButton onClick={() => setShowMarker(!showMarker)}>{showMarker ? <LocationOffIcon sx={{ color: 'blue' }} /> : <PinDropIcon sx={{ color: 'blue' }} />}</IconButton>
      </div> */}
    <MapContainer center={[30.605765, 131.001609]} zoom={11} style={{ height: '100vh', width: '100%'}} zoomControl={false}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
          attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <FetchAllPinsComponent showMarker={showMarker} reloadState={reloadState} reload={handleUpdate} />
        <ZoomControl position="topright" />
    </MapContainer>
    </div>
  );
} 
export default App;
