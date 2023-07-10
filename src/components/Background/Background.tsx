import React, { useState, useEffect } from 'react'
import { ITime } from '../Main/Main';
import styles from './Background.module.scss'
import timerConverter from '../../utils/timerConverter';


interface IProps {
	isStarted: boolean,
	setIsStarted: (val: boolean) => void;
}


const Timer = ({ isStarted, setIsStarted }: IProps) => {
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
		<>
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
		</>
	);
}


export default Timer;


chrome.runtime.onConnect.addListener(port => {
	console.log(`Connection establed on ${port.name} port!`);
})