import { AudioValuesType } from "../types/types";
import { fetchAndStartAudio, playAudio } from "../utils/audioManager";




const audioElem = document.querySelector('audio');

chrome.runtime.onMessage.addListener(message => {
   if (message.target === 'offscreen') {
      playAudio(audioElem, message.data as AudioValuesType)
   }
})



