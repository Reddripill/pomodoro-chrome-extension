import { ITime } from "../components/Main/Main";
import { StorageValueType } from "../types/types";
import { timer } from "../utils/timer";

let timerPort: null | chrome.runtime.Port = null;

let time = {
	hours: 0,
	minutes: 40,
	seconds: 0
}

export interface ITimerProperties {
   time: ITime,
   fullTime: ITime,
   defaultTime: ITime,
   mode: 'Stop' | 'Start',
   isStarted: boolean,
   isComplete: boolean,
   timestamp: null | NodeJS.Timer,
}


chrome.runtime.onInstalled.addListener(async() => {
   let timerProperties: ITimerProperties = {
      time,
      fullTime: time,
      defaultTime: time,
      mode: 'Stop',
      isStarted: false,
      isComplete: false,
      timestamp: null,
   }
   await chrome.storage.local.set({timerProperties})
})

chrome.runtime.onConnect.addListener(async (port) => {
   let {timerProperties} = await chrome.storage.local.get('timerProperties') as StorageValueType<ITimerProperties>;
	if (port.name === 'timer') {
      timerPort = port;

      port.postMessage({timerProperties})

		port.onDisconnect.addListener(async () => {
         timerPort = null;
		})
	}
})

chrome.storage.onChanged.addListener(changes => {
   for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
      if (key === 'timerProperties') {
         console.log('Old Value: ', oldValue);
         console.log('New Value: ', newValue);
         if (newValue.mode !== oldValue.mode) {
            timer()
         }
         if (timerPort) {
            timerPort.postMessage({timerProperties: newValue})
         }
      }
   }
})