import React, { useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import PinData from './PinData';
import {addPin} from './PinApi'; 
  
export const AddPinComponent = () => {
    const [position, setPosition] = useState<LatLng | null>(null);
    const [newPin, setNewPin] = useState({ title: '', description: '', category: '',imageUrl: '' });

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  const handleSave = () => {
    if (position) {
        const pinData = {
        ...newPin,
        latitude: position.lat,
        longitude: position.lng,
        };
        addPin(pinData); // ここでピンの追加処理を呼び出します。
        setPosition(null); // フォームを閉じる
    }
  };

  return position === null ? null : (
    <Marker position={position} icon={new L.Icon({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    })}>
      <Popup>
        <div>
          <label>タイトル:<input type="text" value={newPin.title} onChange={(e) => setNewPin({...newPin, title: e.target.value})} /></label><br />
          <label>説明:<textarea value={newPin.description} onChange={(e) => setNewPin({...newPin, description: e.target.value})} /></label><br />
          <label>カテゴリ:<input type="text" value={newPin.category} onChange={(e) => setNewPin({...newPin, category: e.target.value})} /></label><br />
          <label>画像URL:<input type="text" value={newPin.imageUrl} onChange={(e) => setNewPin({...newPin, imageUrl: e.target.value})} /></label><br />
          <button onClick={handleSave}>保存</button>
        </div>
      </Popup>
    </Marker>
  );
};
