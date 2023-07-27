import { AudioValuesType } from "../types/types";
import { playAudio } from "../utils/audioManager";




const audioElem = document.querySelector('audio');

chrome.runtime.onMessage.addListener(async (message) => {
   if (message.target === 'offscreen') {
      await playAudio(audioElem, message.data as AudioValuesType);
   }
})

audioElem.addEventListener('ended', () => {
   chrome.runtime.sendMessage({
      target: 'background',
      isCloseOffscreen: true
   })
})