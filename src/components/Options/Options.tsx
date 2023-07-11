import React, { useState, useEffect } from 'react'
import styles from './Options.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { ITime } from '../Main/Main';

interface IProps {
	cb?: () => void;
	port: chrome.runtime.Port
}

const Options = ({cb, port}: IProps) => {
	const [minutes, setMinutes] = useState<number | string>(30);
	useEffect(() => {
		port.postMessage({timeMessage: {
			time: {
				hours: 0,
				minutes: minutes,
				seconds: 0,
			}
		}})
	}, [minutes])
	return (
		<div className={styles.options}>
			<Input
				value={minutes}
				onChange={(val) => setMinutes(val)}
				id='minutes-input'
				label='Minutes'
			/>
			<Button
			 	type='submit'
				clickHandler={cb}
			>
				Save
			</Button>
		</div>
	)
}

export default Options