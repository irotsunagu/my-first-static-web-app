import L, { Icon, IconOptions } from 'leaflet';
import accessories from '../assets/accessories.png';
import cake from '../assets/cake.png';
import fashion from '../assets/fashion.png';
import restaurant from '../assets/restaurant.png';
import sweets from '../assets/sweets.png';

// インデックスシグネチャを持つオブジェクトの型定義
interface CategoryIconMap {
  [key: string]: Icon<IconOptions>;
  cake: Icon<IconOptions>;
  accessories: Icon<IconOptions>;
  fashion: Icon<IconOptions>;
  restaurant: Icon<IconOptions>;
  default: Icon<IconOptions>;
}

/**
 * ピンのアイコンの見た目を規定
 */
const IconSize:[number,number] = [91, 101];
const IconAnchor:[number,number]= [12, 41];
const PopupAnchor:[number,number]= [1, -34]; 

const customMarkerIcon:CategoryIconMap = {
  cake: L.icon({
    iconUrl: cake,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
  }),
  accessories: L.icon({
    iconUrl: accessories,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
  }),
  fashion: L.icon({
    iconUrl: fashion,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
  }),
  restaurant: L.icon({
    iconUrl: restaurant,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
  }),
  sweets: L.icon({
    iconUrl: sweets,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
  }),
  default: L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
};

export default customMarkerIcon;