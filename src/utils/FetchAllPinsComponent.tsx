import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import PinData from '../models/PinData';
import { fetchAllPins } from '../services/PinApi';
import EditPinComponent from './EditPinComponent'; 
import { AddPinComponent } from './AddPinComponent'; 
import customMarkerIcon from '../components/customMarkerIcon';

// idのsetterをPropsで受け取るための定義
interface propIf {
  showMarker: boolean;
  reloadState: boolean;
  reload: () => void; // 明示的に関数の型を定義
}

export const FetchAllPinsComponent: React.FC<propIf> = ( {showMarker, reloadState, reload }) => {
  const [pins, setPins] = useState<PinData[]>([]);

  // 全ピン情報の取得
  useEffect(() => {
    fetchAllPins().then(setPins).catch(console.error);
  }, [reloadState,reload]);

  if (!showMarker) return null;

  return (
    <>
      <AddPinComponent reload={reload} />
      {pins.map(pin => (
        <Marker key={pin.id} position={[pin.latitude, pin.longitude]} icon={customMarkerIcon}>
          <EditPinComponent pin={pin}  reload={reload} />
        </Marker>
      ))}
    </>
  );
};
