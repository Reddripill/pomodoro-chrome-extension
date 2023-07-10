import React, { useState, useEffect } from 'react'
import timerConverter from '../../utils/timerConverter';
import styles from './Main.module.scss'
import Sidebar from '../Sidebar/Sidebar';
import Timer from '../Background/Background'

export interface ITime {
	hours: number;
	minutes: number;
	seconds: number;
}


const Main = () => {
	const [isStarted, setIsStarted] = useState<boolean>(false)

	return (
		<div className={styles.wrapper}>
			<Timer
				isStarted={isStarted}
				setIsStarted={setIsStarted}
			/>
			<Sidebar />
		</div>
	)

}

export default Main;