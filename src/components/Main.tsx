import React, { useState, useEffect } from 'react'
import timerConverter from '../utils/timerConverter';

export interface ITime {
	hours: number;
	minutes: number;
	seconds: number;
}

interface IProps {
	setOptions: () => void;
}

const Main = ({ setOptions }: IProps) => {
	const [isStarted, setIsStarted] = useState<boolean>(false)
	const [time, setTime] = useState<ITime>({
		hours: 0,
		minutes: 40,
		seconds: 0,
	})
	useEffect(() => {
		if (isStarted) {
			const timestamp = setInterval(() => {
				setTime(prev => {
					if (prev.seconds === 0) {
						return {
							...prev,
							minutes: prev.minutes - 1,
							seconds: 59,
						}
					} else {
						return {
							...prev,
							seconds: prev.seconds - 1,
						}
					}
				})
			}, 1000)
			return () => {
				clearInterval(timestamp);
			}
		}
	}, [isStarted])

	return (
		<div>
			<h1>Pomodoro</h1>
			<div>{timerConverter(time)}</div>
			<div style={{ display: 'flex' }}>
				<button type='button' onClick={() => setIsStarted(true)}>Start</button>
				<button type='button' onClick={() => setIsStarted(false)}>Stop</button>
			</div>
		</div>
	)

}

export default Main