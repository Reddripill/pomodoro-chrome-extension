import { ITime } from "../components/Main/Main";

export interface IExtensionMessages {
	isActive: boolean;
	time: ITime;
	popup: boolean;
}

type ModeType = 'Stop' | 'Start';

let timestamp: NodeJS.Timer | null = null;
let popupPort: null | chrome.runtime.Port = null;
let mode: ModeType = 'Stop';
let time = {
	hours: 0,
	minutes: 40,
	seconds: 0
}
let fullTime = Object.assign({}, time)
let isComplete = false;
let isStarted = false;


chrome.runtime.onInstalled.addListener(async() => {
	await chrome.storage.local.get('defaultTime').then(result => {
		if (!result.defaultTime) {
			chrome.storage.local.set({defaultTime: time});
		}
	})
})

chrome.runtime.onConnect.addListener(port => {
	if (port.name === 'timer') {
		const timer = (modeArg: ModeType) => {
			mode = modeArg
			if (modeArg === 'Start') {
				isStarted = true;
				timestamp = setInterval(() => {
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
					if (popupPort) {
						port.postMessage({time, fullTime})
					}
				}, 1000)
			} else {
				clearInterval(timestamp);
			}
		}

		chrome.storage.local.get('defaultTime')
		.then(result => {
			if (!isStarted) {
				time = Object.assign({}, result.defaultTime);
				fullTime = Object.assign({}, result.defaultTime);
			}
		})
		.finally(() => {
			popupPort = port;
			port.postMessage({time, fullTime})
			if (timestamp) {
				clearInterval(timestamp)
				timer(mode)
			}
		})

		// Make switch construction for onMessage handler
		port.onMessage.addListener(message => {
			if (message.mode) {
				timer(message.mode)
			}
		})

		chrome.storage.onChanged.addListener(changes => {
			for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
				if (key === 'defaultTime' && !isStarted) {
					time = Object.assign({}, newValue);
					fullTime = Object.assign({}, newValue);
					port.postMessage({time, fullTime})
				}
			}
		})

		port.onDisconnect.addListener(() => {
			popupPort = null;
		})
	}
})
