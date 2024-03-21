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
const IconSize:[number,number] = [91, 101];
const IconAnchor:[number,number]= [12, 41];
const PopupAnchor:[number,number]= [1, -34]; 

/**
 * ピンのアイコンの見た目を規定
 */
const IconSize:[number,number] = [91, 101];
const IconAnchor:[number,number]= [12, 41];
const PopupAnchor: [number, number] = [1, -34]; 

const customMarkerIcon:CategoryIconMap = {
  Hero: L.icon({
    iconUrl: Hero,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
  }),
  Boss: L.icon({
    iconUrl: Boss,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
  }),
  Chest: L.icon({
    iconUrl: Chest,
    iconSize: [60, 71], 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
  }),
  Last: L.icon({
    iconUrl: Last,
    iconSize: IconSize, 
    iconAnchor: IconAnchor, 
    popupAnchor: PopupAnchor,
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