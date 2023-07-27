import React from 'react'
import styles from './TimerInput.module.scss'
import { IStringTime } from '../../../utils/timeConverter';
import { SetStateType } from '../../../types/types';


interface IProps {
	value: IStringTime;
	label: string;
	id: string;
	onChange: (arg: string, type: keyof IStringTime) => void;
}

const TimerInput = ({value, label, id, onChange}: IProps) => {
   const blurHandler = (e: React.FocusEvent<HTMLInputElement>, type: keyof IStringTime) => {
      let inputValue = e.target.value;
      if (inputValue.length === 1) {
         inputValue = '0' + inputValue
      }
      onChange(inputValue, type)
   }
	return (
		<div className={styles.container}>
			<label htmlFor={id} className={styles.label}>{label}</label>
			<div className={styles.inputs}>
				<input 
					type="text" 
					className={styles.input}
					id={`${id}-hours`}
					value={value.hours}
					onChange={e => {
						onChange(e.target.value, 'hours')
					}}
               onBlur={e => blurHandler(e, 'hours')}
				/>
				<div className={styles.colon}>:</div>
				<input 
					type="text" 
					className={styles.input}
					id={`${id}-minutes`}
					value={value.minutes}
					onChange={e => onChange(e.target.value, 'minutes')}
               onBlur={e => blurHandler(e, 'minutes')}
				/>
				<div className={styles.colon}>:</div>
				<input 
					type="text" 
					className={styles.input}
					id={`${id}-seconds`}
					value={value.seconds}
					onChange={e => onChange(e.target.value, 'seconds')}
               onBlur={e => blurHandler(e, 'seconds')}
				/>
			</div>
		</div>
	)
}

export default TimerInput