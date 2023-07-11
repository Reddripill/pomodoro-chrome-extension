import { ITime } from "../components/Main/Main";



export default function timerConverter(time: ITime | null): string {
	if (!time) {
		return '41:00'
	}
	const timeArr = [time.hours, time.minutes, time.seconds];
	let convertedTime = timeArr.map(item => (item < 10) ? '0' + item : item.toString());
	if (+convertedTime[0] === 0) {
		convertedTime.shift()
	}
	return convertedTime.join(':');
}