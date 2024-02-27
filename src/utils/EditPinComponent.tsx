// 必要なインポート
import React, { useState, useEffect, useRef } from 'react';
import { Popup } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import {updatePin,deletePin} from '../services/PinApi'; 
import PinData from '../models/PinData';

// PinDataをPropsで受け取るための定義
interface propIf {
  pin: PinData;
  reload: () => void; // 明示的に関数の型を定義
}

// ピン情報の編集（削除含む）
const EditPinComponent: React.FC<propIf> = ({pin, reload }) => {
  // 編集モードか削除モードかの状態を管理
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  // 各ピン項目の情報の状態を管理
  const [editTitle, setEditTitle] = useState(pin.title);
  const [editDescription, setEditDescription] = useState(pin.description);
  const [editCategory, setEditCategory] = useState(pin.category);
  const [editImageUrl, setEditImageUrl] = useState(pin.imageUrl);
  const [position] = useState<LatLng | null>(new L.LatLng(pin.latitude, pin.longitude));

  // 初期化
  const handleInit = () => {
    setEditTitle("");
    setEditDescription("");
    setEditCategory("");
    setEditImageUrl("");
  };

  // 編集ボタン=>保存ボタン押下後の更新処理（API呼び出し）
  const handleUpdate = async () => {
    await updatePin(pin.id, { ...pin, title: editTitle, description: editDescription, category: editCategory, imageUrl: editImageUrl });
    setEditMode(false);
    reload();
    // 初期化
    handleInit();
  };

  // 削除ボタン=>削除ボタン押下後の更新処理（API呼び出し）
  const handleDelete = async () => {
    await deletePin(pin.id);
    setConfirmDelete(false);
    reload();
    // 初期化
    handleInit();
  };

  // キャンセルボタン押下後の処理
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditMode(false);
    setConfirmDelete(false);
  }

  // 編集ボタン押下後の処理
  const handleEditModeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditMode(true);
  }

  // 削除ボタン押下後の処理
  const handleConfirmDeleteChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setConfirmDelete(true);
  }

  // ポップアップへの参照
  const popupRef = useRef<L.Popup | null>(null);

  // ポップアップがレンダリングされた後にポップアップを開くための参照を定義
  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.openPopup();
    }
  }, [position]);

  // 編集ボタン押下後のポップアップ
  if (editMode) {
    return (
      <Popup ref={popupRef}> 
        <div>
          <label>タイトル：<input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /></label><br/>
          <label>説明：<textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} /></label><br/>
          <label>カテゴリ：<input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} /></label><br/>
          <label>画像URL:<input type="text" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} /></label><br/>
          <button onClick={handleUpdate}>保存</button>
          <button onClick={handleCancel}>キャンセル</button>
        </div>
      </Popup>
    );
  }

  // 削除ボタン押下後のポップアップ
  if (confirmDelete) {
    return (
      <Popup ref={popupRef}>
        <div>
          このピンを削除しますか？
          <button onClick={handleDelete}>削除</button>
          <button onClick={handleCancel}>キャンセル</button>
        </div>
      </Popup>
    );
  }

  // 登録済みのピン押下後のポップアップ
  return (
    <Popup ref={popupRef}>
      <div>
        <h3>タイトル：{pin.title}</h3>
        <p>説明：{pin.description}</p>
        <p>カテゴリ：{pin.category}</p>
        {pin.imageUrl && <img src={pin.imageUrl} alt={pin.title} style={{ maxWidth: '100px' }} />}
        <button onClick={handleEditModeChange}>編集</button>
        <button onClick={handleConfirmDeleteChange}>削除</button>
      </div>
    </Popup>
  );
};

export default EditPinComponent;