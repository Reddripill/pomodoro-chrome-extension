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
/* let timerMessage: IExtensionMessages = {
	time: {
		hours: 0,
		minutes: 40,
		seconds: 0
	},
	isActive: false,
	popup: false
}; */
let count = 0;
let mode = 'Stop';
let time = {
	hours: 0,
	minutes: 40,
	seconds: 0
}
let defaultTime = {
	hours: 0,
	minutes: 40,
	seconds: 0
}


chrome.runtime.onConnect.addListener(port => {
	if (port.name === 'timer') {
		const timer = (modeArg: string) => {
			mode = modeArg
			if (modeArg === 'Start') {
				timestamp = setInterval(() => {
					if (time.seconds === 0) {
						time.minutes -= 1;
						time.seconds = 59;
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
			if (message.time) {
				defaultTime = message.time;
				console.log('NEW DEFAULT TIME: ', defaultTime);
			}
		})
		port.onDisconnect.addListener(disconnectedPort => {
			popupPort = null;
		})
	}
})


