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

let timestamp: NodeJS.Timer;
let timerMessage: IExtensionMessages = {
	time: {
		hours: 0,
		minutes: 40,
		seconds: 0
	},
	isActive: false,
	popup: false
};


chrome.runtime.onConnect.addListener(port => {
	timerMessage.popup = true;
	port.postMessage({timerMessage})

	port.onDisconnect.addListener(disconnect => {
		timerMessage.popup = false;
	})

	port.onMessage.addListener((message) => {
		const respondedMessage = message.timerMessage;
		if (respondedMessage.isActive) {
			timerMessage.isActive = respondedMessage.isActive
		}
		if (timerMessage.isActive) {
			console.log('isActive');
			timestamp = setInterval(() => {
				let time = timerMessage.time;
				if (time.seconds === 0) {
					time.minutes -= 1;
					time.seconds = 59;
				} else {
					time.seconds -= 1;
				}
				if (timerMessage.popup) {
					port.postMessage({timerMessage});
				}
			}, 1000)
		} else {
			clearInterval(timestamp)
		}
		console.log('BACKGROUND MESSAGE: ', respondedMessage);
	})
})


