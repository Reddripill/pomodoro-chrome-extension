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

chrome.runtime.onConnect.addListener(port => {
	if (port.name === 'timer') {
		chrome.storage.local.get('defaultTime').then(result => {
			if (!result.defaultTime) {
				chrome.storage.local.set({defaultTime: time})
			}
		})
		const timer = (modeArg: string) => {
			mode = modeArg
			if (modeArg === 'Start') {
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
				timestamp = null;
			}
		}
		port.postMessage({time})
		popupPort = port;
		if (timestamp) {
			clearInterval(timestamp)
			timestamp = null;
			if (mode === 'Start') {
				timer(mode)
			}
		}
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
				console.log('CHANGES: ', changes);
				if (key === 'defaultTime' && time.minutes === oldValue.minutes) {
					console.log('DEFAULT TIME');
					chrome.storage.local.remove('fullTime')
					time = newValue;
					port.postMessage({time})
				}
			}
		})
	}
})
