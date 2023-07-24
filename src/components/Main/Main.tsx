import React, { useContext } from 'react'
import styles from './Main.module.scss'
import Sidebar from '../Sidebar/Sidebar';
import { PortContext } from '../../providers/PortProvider';
import Timer from '../UI/Timer/Timer';


export interface ITime {
	hours: number;
	minutes: number;
	seconds: number;
}


const Main = () => {
   const {timerProperties} = useContext(PortContext);
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h1 className={styles.titleText}>Pomodoro</h1>
				<img src='./images/pomodoro.png' alt='Pomodoro' />
			</div>
			<div className={styles.mode}>{timerProperties.mode}</div>
			<Timer />
			<div className={styles.actions}>
				<button className={styles.buttonAction} type='button' onClick={() => {
					chrome.storage.local.set({timerProperties: {
                  ...timerProperties,
                  status: 'Start'
               }})
				}}>Start</button>
				<button className={styles.buttonAction} type='button' onClick={() => {
					chrome.storage.local.set({timerProperties: {
                  ...timerProperties,
                  status: 'Stop'
               }})
				}}>Stop</button>
			</div>
			<Sidebar />
		</div>
	)

}

export default Main;