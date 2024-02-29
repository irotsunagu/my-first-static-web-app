import L, { Icon, IconOptions } from 'leaflet';
import Boss from '../assets/boss.png';
import Hero from '../assets/hero.png';
import Chest from '../assets/chest.png';
import Last from '../assets/last.png';

// インデックスシグネチャを持つオブジェクトの型定義
interface CategoryIconMap {
  [key: string]: Icon<IconOptions>;
  Hero: Icon<IconOptions>;
  Boss: Icon<IconOptions>;
  Chest: Icon<IconOptions>;
  Last: Icon<IconOptions>;
  default: Icon<IconOptions>;
}

/**
 * ピンのアイコンの見た目を規定
 */
const customMarkerIcon:CategoryIconMap = {
  Hero: L.icon({
    iconUrl: Hero,
    iconSize: [41, 51], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
  }),
  Boss: L.icon({
    iconUrl: Boss,
    iconSize: [41, 51],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Chest: L.icon({
    iconUrl: Chest,
    iconSize: [41, 51],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  Last: L.icon({
    iconUrl: Last,
    iconSize: [41, 51],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
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