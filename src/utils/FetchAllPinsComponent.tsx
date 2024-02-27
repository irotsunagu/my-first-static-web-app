import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import PinData from '../models/PinData';
import { fetchAllPins } from '../services/PinApi';
import EditPinComponent from './EditPinComponent'; 
import { AddPinComponent } from './AddPinComponent'; 
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// idのsetterをPropsで受け取るための定義
interface propIf {
  reloadState: boolean;
  reload: () => void; // 明示的に関数の型を定義
}

export const FetchAllPinsComponent: React.FC<propIf> = ( {reloadState, reload }) => {
  const [pins, setPins] = useState<PinData[]>([]);

  // デフォルトのマーカーアイコンを規定
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });

  // 全ピン情報の取得
  useEffect(() => {
    fetchAllPins().then(setPins).catch(console.error);
  }, [reloadState,reload]);

  return (
    <>
      <AddPinComponent reload={reload} />
      {pins.map(pin => (
        <Marker key={pin.id} position={[pin.latitude, pin.longitude]} >
          <EditPinComponent pin={pin}  reload={reload} />
        </Marker>
      ))}
    </>
  );
};
