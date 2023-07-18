import React from 'react'
import styles from './TimerInput.module.scss'
import { ITime } from '../../Main/Main';


interface IProps {
	value: ITime;
	label: string;
	id: string;
	onChange: (arg: string, type: keyof ITime) => void;
}

const TimerInput = ({value, label, id, onChange}: IProps) => {
	const convertedTime = (e: React.FocusEvent<HTMLInputElement>): void => {
      let value = e.target.value;
		if (value.length === 1) {
         value = '0' + value;
      }
      e.target.value = value;
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
               onBlur={convertedTime}
				/>
				<div className={styles.colon}>:</div>
				<input 
					type="text" 
					className={styles.input}
					id={`${id}-minutes`}
					value={value.minutes}
					onChange={e => onChange(e.target.value, 'minutes')}
               onBlur={convertedTime}
				/>
				<div className={styles.colon}>:</div>
				<input 
					type="text" 
					className={styles.input}
					id={`${id}-seconds`}
					value={value.seconds}
					onChange={e => onChange(e.target.value, 'seconds')}
               onBlur={convertedTime}
				/>
			</div>
		</div>
	)
}

export default TimerInput