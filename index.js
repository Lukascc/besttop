import * as alt from "alt-server";
import { MaleTorsoData, FemaleTorsoData } from './config.js'

const MALE_MODEL_HASH = alt.hash("mp_m_freemode_01");
const FEMALE_MODEL_HASH = alt.hash("mp_f_freemode_01");

const ARMS_COMPONENT = 3;
const SHIRT_COMPONENT = 8;
const JACKET_COMPONENT = 11;

export function m_SetClothes(player, component, drawable, texture, pattern, force = false) {
  let torsoData;
  switch (player.model) {
    case MALE_MODEL_HASH:
      torsoData = MaleTorsoData;
      break;
    case FEMALE_MODEL_HASH:
      torsoData = FemaleTorsoData;
      break;
    default:
      return;
  }

  if (component !== ARMS_COMPONENT && component !== SHIRT_COMPONENT) {
    player.setClothes(component, drawable, texture, pattern);
  }

  if (component === JACKET_COMPONENT) {
    const chosenTorso = torsoData[drawable];
    const armsDrawable = force ? drawable : chosenTorso.arms;
    player.setClothes(ARMS_COMPONENT, armsDrawable, 0);

    const validShirts = chosenTorso.validShirts;
    const chosenShirtIndex = Math.floor(Math.random() * validShirts.length);
    player.setClothes(SHIRT_COMPONENT, validShirts[chosenShirtIndex], 0);
  }
}
