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
   const startHandler = () => {
      chrome.storage.local.set({timerProperties: {
         ...timerProperties,
         status: 'Start'
      }})
   }
   const stopHandler = () => {
      chrome.storage.local.set({timerProperties: {
         ...timerProperties,
         status: 'Stop'
      }})
   }
   const skipHandler = () => {
      if (timerProperties.mode === 'Job') {
         chrome.storage.local.set({timerProperties: {
            ...timerProperties,
            mode: 'Chill',
            status: 'Start',
            time: timerProperties.defaultChillTime,
            fullTime: timerProperties.defaultChillTime
         }})
      } else {
         chrome.storage.local.set({timerProperties: {
            ...timerProperties,
            status: 'Stop',
            mode: 'Job',
            time: timerProperties.defaultJobTime,
            fullTime: timerProperties.defaultJobTime
         }})
      }
   }
   const resetHandler = () => {
      chrome.storage.local.set({timerProperties: {
         ...timerProperties,
         status: 'Stop',
         isStarted: false,
         time: timerProperties.mode === 'Job' ? timerProperties.defaultJobTime : timerProperties.defaultChillTime
      }})
   }
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h1 className={styles.titleText}>Pomodoro</h1>
				<img src='./images/pomodoro.png' alt='Pomodoro' />
			</div>
			<div className={styles.mode}>{timerProperties.mode}</div>
			<Timer />
			<div className={styles.actions}>
            {timerProperties.status === 'Start' ? 
               <button className={styles.buttonAction} type='button' onClick={stopHandler}>Stop</button>
               :
               <button className={styles.buttonAction} type='button' onClick={startHandler}>Start</button>
            }
            {timerProperties.isStarted ? 
               <button className={styles.buttonAction} type='button' onClick={resetHandler}>Reset</button>
               :
               <button className={styles.buttonAction} type='button' onClick={skipHandler}>Skip</button>
            }
			</div>
			<Sidebar />
		</div>
	)

}

export default Main;