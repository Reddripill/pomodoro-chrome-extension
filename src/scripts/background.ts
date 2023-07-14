export interface IExtensionMessages {
	isActive: boolean;
	time: ITime;
	popup: boolean;
}
export interface ITime {
	hours: number;
	minutes: number;
	seconds: number;
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
let fullTime = {
	hours: 0,
	minutes: 40,
	seconds: 0
}
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
					let changedTime = Object.assign({}, time)
					if (changedTime.seconds === 0) {
						if (changedTime.minutes === 0) {
							if (changedTime.hours !== 0) {
								changedTime.hours -= 1;
								changedTime.minutes = 59;
								changedTime.seconds = 59;
							} else {
								isComplete = true;
							}
						} else {
							changedTime.minutes -= 1;
							changedTime.seconds = 59;
						}
					} else {
						changedTime.seconds -= 1;
					}
					if (popupPort) {
						port.postMessage({time: changedTime, fullTime})
					}
				}, 1000)
			} else {
				clearInterval(timestamp);
			}
		}

		chrome.storage.local.get('defaultTime')
		.then(result => {
			if (!isStarted) {
				time = result.defaultTime;
				fullTime = result.defaultTime;
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
					time = newValue;
					fullTime = newValue;
					port.postMessage({time})
				}
			}
		})

		port.onDisconnect.addListener(() => {
			popupPort = null;
		})
	}
})
