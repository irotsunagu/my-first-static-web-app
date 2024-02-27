import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import PinData from '../models/PinData';
import { fetchPin } from '../services/PinApi';
import EditPinComponent from './EditPinComponent'; 
import customMarkerIcon from '../components/customMarkerIcon';

// idをPropsで受け取るための定義
interface propIf {
  id: string;
  reload: () => void; // 明示的に関数の型を定義
}

export const FetchPinComponent: React.FC<propIf> = ({id, reload }) => {
  const [pin, setPin] = useState<PinData>();

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
    <Marker key={id} position={[pin.latitude, pin.longitude]} icon={customMarkerIcon} >
      <EditPinComponent pin={pin} reload={reload} />
    </Marker>
  );
};
