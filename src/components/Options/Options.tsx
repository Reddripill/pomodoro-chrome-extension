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
	const [time, setTime] = useState<ITime>({
      hours: 0,
      minutes: 40,
      seconds: 0,
   });
	const clickHandler = async () => {
		await chrome.storage.local.set({timerProperties: {
         ...timerProperties,
         time: !timerProperties.isStarted ? time : timerProperties.time,
         fullTime: !timerProperties.isStarted ? time : timerProperties.time,
         defaultTime: time
      }})
	}
   const changeHandler = (value: string, type: keyof ITime) => {
      setTime(prev => {
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
      setTime(timerProperties.defaultTime)
	}, [timerProperties])
	return (
		<div className={styles.options}>
         <TimerInput
            value={time}
            id='default-time'
            label='Job Time'
            onChange={changeHandler}
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