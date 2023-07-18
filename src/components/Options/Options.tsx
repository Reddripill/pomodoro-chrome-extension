import React, { useState, useEffect } from 'react'
import styles from './Options.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { ITime } from '../Main/Main';
import TimerInput from '../UI/TimerInput/TimerInput';

interface IProps {
	cb?: () => void;
}

const Options = ({cb}: IProps) => {
	const [time, setTime] = useState<ITime>({
      hours: 0,
      minutes: 40,
      seconds: 0,
   });
	const clickHandler = () => {
		chrome.storage.local.set({defaultTime: time})
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
		chrome.storage.local.get('defaultTime').then(result => {
			if (result.defaultTime) {
				setTime(result.defaultTime)
			}
		})
	}, [])
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