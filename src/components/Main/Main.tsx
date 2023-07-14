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

interface IProps {
	time: ITime;
	fullTime: ITime;
}


const Main = ({time, fullTime}: IProps) => {
	const {port} = useContext(PortContext);
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h1 className={styles.titleText}>Pomodoro</h1>
				<img src='./images/pomodoro.png' alt='Pomodoro' />
			</div>
			<div className={styles.mode}>Job</div>
			<Timer time={time} fullTime={fullTime}/>
			<div className={styles.actions}>
				<button className={styles.buttonAction} type='button' onClick={() => {
					port.postMessage({mode: 'Start'})
				}}>Start</button>
				<button className={styles.buttonAction} type='button' onClick={() => {
					port.postMessage({mode: 'Stop'})
				}}>Stop</button>
			</div>
			<Sidebar />
		</div>
	)

}

export default Main;