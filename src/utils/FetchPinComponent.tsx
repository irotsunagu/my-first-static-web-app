import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import PinData from '../models/PinData';
import { fetchPin } from '../services/PinApi';
import EditPinComponent from './EditPinComponent'; 
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// idをPropsで受け取るための定義
interface propIf {
  id: string;
  reload: () => void; // 明示的に関数の型を定義
}

export const FetchPinComponent: React.FC<propIf> = ({id, reload }) => {
  const [pin, setPin] = useState<PinData>();

// デフォルトのマーカーアイコンを規定
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

  // ピン情報の取得
  useEffect(() => {
    if (id !== '') {
      fetchPin(id).then(setPin).catch(console.error);
    }
  }, [id]);

  // もしpinがundefinedの可能性があるなら、pinを使用する前にチェックする
  if (!pin) return null;

  // ピン情報をマッピングして返却する
  return (
    <Marker key={id} position={[pin.latitude, pin.longitude]} >
      <EditPinComponent pin={pin} reload={reload} />
    </Marker>
  );
};
