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

let timestamp: NodeJS.Timer | null = null;
let popupPort: null | chrome.runtime.Port = null;
let mode = 'Stop';
let time = {
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
			chrome.storage.local.set({fullTime: time})
		}
	})
})

chrome.runtime.onConnect.addListener(port => {
	if (port.name === 'timer') {
		const timer = (modeArg: string) => {
			mode = modeArg
			if (modeArg === 'Start') {
				isStarted = true;
				chrome.storage.local.get('fullTime').then(result => {
					console.log('FULLTIME BACKGROUND: ', result.fullTime);
					if (!result.fullTime) {
						chrome.storage.local.set({fullTime: time})
					}
				})
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
						port.postMessage({time})
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
			}
		})
		.finally(() => {
			popupPort = port;
			port.postMessage({time})
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
		port.onDisconnect.addListener(disconnectedPort => {
			popupPort = null;
		})
		chrome.storage.onChanged.addListener(changes => {
			for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
				if (key === 'defaultTime' && !isStarted) {
					chrome.storage.local.set({fullTime: newValue})
					time = newValue;
					port.postMessage({time})
				}
			}
		})
	}
})
