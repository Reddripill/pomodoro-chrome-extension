import React, { useState, useEffect, useContext } from 'react'
import styles from './Options.module.scss'
import Button from '../UI/Button/Button'
import { ITime } from '../Main/Main';
import TimerInput from '../UI/TimerInput/TimerInput';
import { PortContext } from '../../providers/PortProvider';

interface IProps {
	cb?: () => void;
}

const Options = ({cb}: IProps) => {
   const {timerProperties} = useContext(PortContext)
	const [jobTime, setJobTime] = useState<ITime>({
      hours: 0,
      minutes: 40,
      seconds: 0,
   });
	const [chillTime, setChillTime] = useState<ITime>({
      hours: 0,
      minutes: 40,
      seconds: 0,
   });
	const clickHandler = async () => {
      const time = timerProperties.mode === 'Job' ? jobTime : chillTime;
		await chrome.storage.local.set({timerProperties: {
         ...timerProperties,
         time: !timerProperties.isStarted ? time : timerProperties.time,
         fullTime: !timerProperties.isStarted ? time : timerProperties.time,
         defaultJobTime: jobTime,
         defaultChillTime: chillTime
      }})
	}
   const chillChangeHandler = (value: string, type: keyof ITime) => {
      setChillTime(prev => {
         if (!isNaN(+value)) {
            if (type !== 'hours' && +value >= 60) return prev;
            return {
               ...prev,
               [type]: +value
            }
         }
         return prev;
      })
   }
   const jobChangeHandler = (value: string, type: keyof ITime) => {
      setJobTime(prev => {
         if (!isNaN(+value)) {
            if (type !== 'hours' && +value >= 60) return prev;
            return {
               ...prev,
               [type]: +value
            }
         }
         return prev;
      })
   }
	useEffect(() => {
      setJobTime(timerProperties.defaultJobTime);
      setChillTime(timerProperties.defaultChillTime);
	}, [timerProperties])
	return (
		<div className={styles.options}>
         <TimerInput
            value={jobTime}
            id='default-job-time'
            label='Job Time'
            onChange={jobChangeHandler}
         />
         <TimerInput
            value={chillTime}
            id='default-chill-time'
            label='Chill Time'
            onChange={chillChangeHandler}
         />
			<Button
			 	type='submit'
				clickHandler={() => {
					cb();
					clickHandler()
				}}
			>
				Save
			</Button>
		</div>
	)
}

export default Options