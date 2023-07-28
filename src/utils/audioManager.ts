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

let audioCtx: AudioContext;
let audioSource: AudioBufferSourceNode;
const initializeAudio = () => {
   audioCtx = new (window.AudioContext || window.webkitAudioContext)()
}
const decodeAudio = async (audioData: ArrayBuffer) => {
   const decodedData = await audioCtx.decodeAudioData(audioData);
   audioSource = audioCtx.createBufferSource();
   audioSource.buffer = decodedData;
   audioSource.connect(audioCtx.destination)
}
export const fetchAndTestAudio = async (audio: string) => {
   try {
      const response = await fetch(`./audio/${audio}.mp3`);
      const buffer = await response.arrayBuffer();
      if(!audioCtx) {
         initializeAudio()
      }
      await decodeAudio(buffer);
      audioSource.start()
   } catch(err) {
      console.error('Error loading audio: ', err);
   }
}