import React, { useState, useEffect } from 'react'
import timerConverter from '../../utils/timerConverter';
import styles from './Main.module.scss'
import Sidebar from '../Sidebar/Sidebar';

export interface ITime {
	hours: number;
	minutes: number;
	seconds: number;
}

interface IProps {
	time: ITime,
	port: chrome.runtime.Port
}


const Main = ({time, port}: IProps) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h1 className={styles.titleText}>Pomodoro</h1>
				<img src='./images/pomodoro.png' alt='Pomodoro' />
			</div>
			<div className={styles.mode}>Job</div>
			<div className={styles.timer}>{timerConverter(time)}</div>
			<div className={styles.actions}>
				<button className={styles.buttonAction} type='button' onClick={() => {
					port.postMessage({
						timerMessage: {
							time,
							isActive: true
						}
					})
				}}>Start</button>
				<button className={styles.buttonAction} type='button' onClick={() => {
					port.postMessage({
						timerMessage: {
							time,
							isActive: false
						}
					})
				}}>Stop</button>
			</div>
			<Sidebar port={port} />
		</div>
	)

}

export default Main;