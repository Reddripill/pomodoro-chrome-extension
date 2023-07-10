import React from 'react'
import styles from './Input.module.scss'

interface IProps {
	value: string | number;
	label: string;
	id: string;
	onChange: (arg: string) => void;
}


const Input = ({value, label, id, onChange}: IProps) => {
	return (
		<div className={styles.input}>
			<label htmlFor={id} className={styles.label}>{label}</label>
			<input 
				type="text" 
				className={styles['input-field']}
				id={id}
				value={value}
				onChange={e => onChange(e.target.value)}
			 />
		</div>
	)
}

export default Input