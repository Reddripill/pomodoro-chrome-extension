import { ITime } from "../components/Main/Main";


const timerProgress = (fullTime: ITime, currentTIme: ITime, length: number): string => {
	const fullTimeSeconds = fullTime.seconds + fullTime.minutes * 60 + fullTime.hours * 3600;
	const currentTimeSeconds = currentTIme.seconds + currentTIme.minutes * 60 + currentTIme.hours * 3600;
	const remainingTime = (currentTimeSeconds / fullTimeSeconds) * length;
	return `${remainingTime} ${length}`;
}

export default timerProgress;