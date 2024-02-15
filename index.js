
import * as alt from "alt-server";

import {MaleTorsoData,FemaleTorsoData} from './config.js'

export function m_SetClothes(player, component, drawable, texture, pattern, force = false) {
  let torsoData;
  if (player.model === alt.hash("mp_m_freemode_01")) {
      torsoData = MaleTorsoData;
  } else if (player.model === alt.hash("mp_f_freemode_01")) {
      torsoData = FemaleTorsoData;
  } else {
      alt.log('ne mp ped');
      return;
  }
    if (component !== 3 && component !== 8) {
      player.setClothes(component, drawable, texture, pattern);
  }

  if (component === 11) {
      const chosenTorso = torsoData[drawable];
  
      alt.log(`keiciamos rankos ${chosenTorso.arms}`);
      
      if (force) {
          player.setClothes(3, drawable, 0);
      } else {
          player.setClothes(3, chosenTorso.arms, 0);
      }
      
      const validShirts = chosenTorso.validShirts;
      const chosenShirtIndex = Math.floor(Math.random() * validShirts.length);
      alt.log(`keiciami marskinukai ${chosenShirtIndex}`);
      player.setClothes(8, validShirts[chosenShirtIndex], 0);
  }
}