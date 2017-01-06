  'use strict';

export function LostItemData(){
'ngInject';
 var savedLats = [];
 var savedLongs = [];
 function set(lats, longs) {
   savedLats = lats;
   savedLongs = longs;
 }
 function getLats() {
  return savedLats;
 }
 function getLongs() {
   return savedLongs;
 }

 return {
  set: set,
  getLats: getLats,
  getLongs: getLongs
 }

};;