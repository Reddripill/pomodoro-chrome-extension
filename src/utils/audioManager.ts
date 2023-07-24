import { AudioValuesType } from "../types/types";

export const playAudio = async (audioEl: HTMLAudioElement, data: AudioValuesType) => {
   audioEl.volume = data.volume;
   audioEl.src = data.source;
   await audioEl.play();
   console.log('played');
   /* const {timerProperties} = await chrome.storage.local.get('timerProperties');
   console.log("TEST: ", timerProperties);
   await chrome.storage.local.set({timerProperties: {
      ...timerProperties,
      status: 'Start'
   }}) */
}