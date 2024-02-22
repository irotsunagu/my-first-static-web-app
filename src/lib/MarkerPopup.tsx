// 必要なインポート
import React, { useState } from 'react';
import { Popup } from 'react-leaflet';
import MarkerPopupProps from './MarkerPopupProps';

// 
const MarkerPopup: React.FC<MarkerPopupProps> = ({ pin, updatePin, deletePin }) => {
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editTitle, setEditTitle] = useState(pin.title);
  const [editDescription, setEditDescription] = useState(pin.description);
  const [editCategory, setEditCategory] = useState(pin.category);

  const handleEdit = async () => {
    // 保存ボタンの処理
    await updatePin(pin.id, { ...pin, title: editTitle, description: editDescription, category: editCategory });
    setEditMode(false);
  };

  const handleDelete = async () => {
    // 実際の削除処理
    await deletePin(pin.id);
  };

  if (editMode) {
    return (
      <Popup>
        <div>
          <label>タイトル：<input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /></label><br/>
          <label>説明：<textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} /></label><br/>
          <label>カテゴリ：<input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} /></label><br/>
          <button onClick={handleEdit}>保存</button>
          <button onClick={() => setEditMode(false)}>キャンセル</button>
        </div>
      </Popup>
    );
  }

  if (confirmDelete) {
    return (
      <Popup>
        <div>
          このピンを削除しますか？
          <button onClick={handleDelete}>削除</button>
          <button onClick={() => setConfirmDelete(false)}>キャンセル</button>
        </div>
      </Popup>
    );
  }

  return (
    <Popup>
      <div>
        <h3>タイトル：{pin.title}</h3>
        <p>説明：{pin.description}</p>
        <p>カテゴリ：{pin.category}</p>
        {pin.imageUrl && <img src={pin.imageUrl} alt={pin.title} style={{ maxWidth: '200px' }} />}
        <button onClick={() => setEditMode(true)}>編集</button>
        <button onClick={() => setConfirmDelete(true)}>削除</button>
      </div>
    </Popup>
  );
};

export default MarkerPopup;

