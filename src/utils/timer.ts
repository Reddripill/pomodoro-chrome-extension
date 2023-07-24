import { ITimerProperties } from "../scripts/background";
import { StorageValueType } from "../types/types";
import { setupOffscreen } from "./setupOffscreen";

export const timer = async () => {
   const {timerProperties} = await chrome.storage.local.get('timerProperties') as StorageValueType<ITimerProperties>;
   let {status, time, isStarted, timestamp, isComplete, fullTime, mode} = timerProperties;
   if (status === 'Start') {
      timestamp = setInterval(async () => {
         isComplete = false;
         isStarted = true;
         if (time.seconds === 0) {
            if (time.minutes === 0) {
               if (time.hours !== 0) {
                  time.hours -= 1;
                  time.minutes = 59;
                  time.seconds = 59;
               } else {
                  isComplete = true;
                  isStarted = false;
                  mode = mode === 'Job' ? 'Chill' : 'Job'; 
                  status = 'Stop';
                  await setupOffscreen('offscreen.html');
                  chrome.runtime.sendMessage({
                     target: 'offscreen',
                     data: {
                        source: './audio/mainSound.mp3',
                        volume: 1
                     }
                  })
               }
            } else {
               time.minutes -= 1;
               time.seconds = 59;
            }
         } else {
            time.seconds -= 1;
         }
         await chrome.storage.local.set({timerProperties: {
            ...timerProperties,
            timestamp,
            isComplete,
            isStarted,
            mode,
            status,
            time,
         }})
      }, 1000)
   } else {
      clearInterval(timestamp);
      await chrome.storage.local.set({timerProperties: {
         ...timerProperties,
         timestamp: null
      }})
   }
}