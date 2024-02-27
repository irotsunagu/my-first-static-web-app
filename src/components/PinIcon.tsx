import { Marker } from 'react-leaflet';
import React from 'react';
import L, { LatLng } from 'leaflet';

// ピンのアイコンの見た目を規定する
export const AddPinComponent: React.FC<LatLng> = (latlng) => {
    return <Marker position={[latlng.lat, latlng.lng]} icon={new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })}/>;
}