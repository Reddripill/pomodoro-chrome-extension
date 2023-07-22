import { ITimerProperties } from "../scripts/background";
import { StorageValueType } from "../types/types";

export const timer = async () => {
   const {timerProperties} = await chrome.storage.local.get('timerProperties') as StorageValueType<ITimerProperties>;
   let {mode, time, isStarted, timestamp, isComplete, fullTime} = timerProperties;
   if (mode === 'Start') {
      timestamp = setInterval(async () => {
         if (time.seconds === 0) {
            if (time.minutes === 0) {
               if (time.hours !== 0) {
                  time.hours -= 1;
                  time.minutes = 59;
                  time.seconds = 59;
               } else {
                  isComplete = true;
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
            isStarted: true,
            time
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