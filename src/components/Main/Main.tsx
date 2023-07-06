import React, { useState, useEffect } from 'react'
import timerConverter from '../../utils/timerConverter';
import styles from './Main.module.scss'

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
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h1 className={styles.titleText}>Pomodoro</h1>
				<img src='./images/pomodoro.png' alt='Pomodoro' />
			</div>
			<div className={styles.mode}>Job</div>
			<div className={styles.timer}>{timerConverter(time)}</div>
			<div className={styles.actions}>
				<button className={styles.buttonAction} type='button' onClick={() => setIsStarted(true)}>Start</button>
				<button className={styles.buttonAction} type='button' onClick={() => setIsStarted(false)}>Stop</button>
			</div>
		</div>
	)

}

export default Main;