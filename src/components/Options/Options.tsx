import React, { useState, useContext } from 'react'
import styles from './Options.module.scss'
import Button from '../UI/Button/Button'
import TimerInput from '../UI/TimerInput/TimerInput';
import { PortContext } from '../../providers/PortProvider';
import { IStringTime, timeNumberConverter, timeStringConverter } from '../../utils/timeConverter';

interface IProps {
	cb?: () => void;
}

const Options = ({cb}: IProps) => {
   const {timerProperties} = useContext(PortContext);
	const [jobTime, setJobTime] = useState<IStringTime>(timeStringConverter(timerProperties.defaultJobTime));
	const [chillTime, setChillTime] = useState<IStringTime>(timeStringConverter(timerProperties.defaultChillTime));
	const clickHandler = async () => {
      const time = timerProperties.mode === 'Job' ? jobTime : chillTime;
		await chrome.storage.local.set({timerProperties: {
         ...timerProperties,
         time: !timerProperties.isStarted ? timeNumberConverter(time) : timerProperties.time,
         fullTime: !timerProperties.isStarted ? timeNumberConverter(time) : timerProperties.time,
         defaultJobTime: timeNumberConverter(jobTime),
         defaultChillTime: timeNumberConverter(chillTime),
      }})
	}
   const chillChangeHandler = (value: string, type: keyof IStringTime) => {
      setChillTime(prev => {
         if (!isNaN(+value)) {
            if (type !== 'hours' && +value >= 60) return prev;
            return {
               ...prev,
               [type]: value
            }
         }
         return prev;
      })
   }
   const jobChangeHandler = (value: string, type: keyof IStringTime) => {
      console.log('Change the state');
      setJobTime(prev => {
         if (!isNaN(+value)) {
            if (type !== 'hours' && +value >= 60) return prev;
            return {
               ...prev,
               [type]: value
            }
         }
         return prev;
      })
   }
	return (
		<>
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
      </>
	)
}

export default Options