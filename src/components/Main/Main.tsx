import React, { useState, useEffect, useContext } from 'react'
import timerConverter from '../../utils/timerConverter';
import styles from './Main.module.scss'
import Sidebar from '../Sidebar/Sidebar';
import { PortContext } from '../../providers/PortProvider';

export interface ITime {
	hours: number;
	minutes: number;
	seconds: number;
}

interface IProps {
	time: number,
}


const Main = ({time}: IProps) => {
	const {port} = useContext(PortContext);
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h1 className={styles.titleText}>Pomodoro</h1>
				<img src='./images/pomodoro.png' alt='Pomodoro' />
			</div>
			<div className={styles.mode}>Job</div>
			<div className={styles.timer}>{time}</div>
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