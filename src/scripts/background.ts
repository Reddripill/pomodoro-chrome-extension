import { StorageValueType } from "../types/types";
import { ITimerProperties, defatultTimerProperties } from "../utils/default";
import { timer } from "../utils/timer";



let timerPort: null | chrome.runtime.Port = null;

chrome.runtime.onInstalled.addListener(async() => {
   await chrome.storage.local.set({timerProperties: defatultTimerProperties})
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