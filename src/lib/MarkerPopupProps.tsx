import PinData from './PinData';

// Markerのポップアップ関数を使うための引数定義
export default interface MarkerPopupProps {
    pin: PinData;
    updatePin: (id: string, pinData: Omit<PinData, 'id'>) => Promise<void>;
    deletePin: (id: string) => Promise<void>;
  }
  