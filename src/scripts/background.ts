import { ITime } from "../components/Main/Main";
import { StorageValueType } from "../types/types";
import { timer } from "../utils/timer";

let timerPort: null | chrome.runtime.Port = null;

let defaultTime = {
	hours: 0,
	minutes: 0,
	seconds: 3
}

export interface ITimerProperties {
   time: ITime,
   fullTime: ITime,
   defaultChillTime: ITime,
   defaultJobTime: ITime,
   mode: 'Job' | 'Chill',
   isStarted: boolean,
   isComplete: boolean,
   timestamp: null | NodeJS.Timer,
   status: 'Stop' | 'Start'
}


chrome.runtime.onInstalled.addListener(async() => {
   let timerProperties: ITimerProperties = {
      time: defaultTime,
      fullTime: defaultTime,
      defaultChillTime: defaultTime,
      defaultJobTime: defaultTime,
      mode: 'Job',
      isStarted: false,
      isComplete: false,
      timestamp: null,
      status: 'Stop'
   }
   await chrome.storage.local.set({timerProperties})
})

chrome.runtime.onConnect.addListener(async (port) => {
   let {timerProperties} = await chrome.storage.local.get('timerProperties') as StorageValueType<ITimerProperties>;
	if (port.name === 'timer') {
      timerPort = port;

      port.postMessage({
         target: 'popup',
         data: timerProperties
      })

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
         if (newValue.status !== oldValue.status) {
            timer()
         }
         if (timerPort) {
            timerPort.postMessage({
               target: 'popup',
               data: newValue
            })
         }
      }
   }
})

chrome.runtime.onMessage.addListener(async (message) => {
   if (message.target === 'background') {
      if (message.isCloseOffscreen) {
         await chrome.offscreen.closeDocument();
         chrome.storage.local.get('timerProperties').then(({timerProperties}: StorageValueType<ITimerProperties>) => {
            const currentTime = timerProperties.mode === 'Job' ? timerProperties.defaultJobTime : timerProperties.defaultChillTime;
            let status = 'Stop';
            if (timerProperties.mode === 'Chill') {
               status = 'Start'
            }
            chrome.storage.local.set({timerProperties: {
               ...timerProperties,
               time: currentTime,
               fullTime: currentTime,
               status
            }})
         })
      }
   }
})