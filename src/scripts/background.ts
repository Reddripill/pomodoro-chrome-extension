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
let timerMessage: IExtensionMessages = {
	time: {
		hours: 0,
		minutes: 40,
		seconds: 0
	},
	isActive: false,
	popup: false
};
let count = 0;
let mode = 'Stop'


chrome.runtime.onConnect.addListener(port => {
	if (port.name === 'timer') {
		const timer = (modeArg: string) => {
			mode = modeArg
			if (modeArg === 'Start') {
				timestamp = setInterval(() => {
					++count;
					if (popupPort) {
						port.postMessage({count: count})
					}
				}, 1000)
			} else {
				clearInterval(timestamp);
				timestamp = null;
			}
		}

		popupPort = port;
		if (timestamp) {
			clearInterval(timestamp)
			timestamp = null;
			if (mode === 'Start') {
				timer(mode)
			}
		}
		port.onMessage.addListener(message => {
			if (message.mode) {
				timer(message.mode)
			}
		})
		port.onDisconnect.addListener(disconnectedPort => {
			popupPort = null;
		})
	}
})


