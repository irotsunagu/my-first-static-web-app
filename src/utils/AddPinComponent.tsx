import React, { useState, useEffect, useRef } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import PinData from '../models/PinData';
import { addPin } from '../services/PinApi';

// idのsetterをPropsで受け取るための定義
interface propIf {
  reload: () => void; // 明示的に関数の型を定義
}

export const AddPinComponent: React.FC<propIf> = ({ reload }) => {
  // ピン位置の状態保持
  const [position, setPosition] = useState<LatLng | null>(null);
  // pinの初期設定
  const [pin, setPin] = useState<PinData>({
    id: '',
    title: '',
    description: '',
    latitude: 0,
    longitude: 0,
    category: '',
    imageUrl: '',
  });
  // マーカーへの参照
  const markerRef = useRef<L.Marker | null>(null);

  // マーカーがレンダリングされた後にポップアップを開くための参照を定義
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [position]);

  // クリックにより位置情報を取得
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  // 登録APIを呼び出すための処理
  const handleSave = async () => {
    if (position && pin) {
      const savePin: PinData = {
        id: "",
        title: pin.title,
        description: pin.description,
        latitude: position.lat,
        longitude: position.lng,
        category: pin.category,
        imageUrl: pin.imageUrl
      }
      // 登録APIを呼び出し
      await addPin(savePin)
        .then(responseData => { // 成功した場合の処理
          reload();
        })
        .catch(error => { // エラーが発生した場合の処理
          console.error('ピンの追加に失敗しました。', error);
        });
      setPosition(null); // フォームを閉じる
      // 初期化
      setPin({ id: "", title: "", description: "", latitude: 0, longitude: 0, category: "", imageUrl: "" })
    }
  };

  // もしpinがundefinedの可能性があるなら、pinを使用する前にチェックする
  if (!pin) return null;

  // positionがnullでない場合（＝クリックしてpositionに何かしら値が入った状態）、ピンとポップアップを返す
  return position === null ? null : (
    <>
      <Marker position={position} icon={new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })}
        ref={markerRef} // MarkerにRefを設定
      >
        <Popup>
          <div>
            <label>タイトル:<input type="text" value={pin.title} onChange={(e) => setPin({ ...pin, title: e.target.value })} /></label><br />
            <label>説明:<textarea value={pin.description} onChange={(e) => setPin({ ...pin, description: e.target.value })} /></label><br />
            <label>カテゴリ:<input type="text" value={pin.category} onChange={(e) => setPin({ ...pin, category: e.target.value })} /></label><br />
            <label>画像URL:<input type="text" value={pin.imageUrl} onChange={(e) => setPin({ ...pin, imageUrl: e.target.value })} /></label><br />
            <button onClick={handleSave}>保存</button>
          </div>
        </Popup>
      </Marker>
    </>
  );
}