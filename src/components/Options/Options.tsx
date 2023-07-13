import React, { useState, useEffect } from 'react'
import styles from './Options.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { ITime } from '../Main/Main';

interface IProps {
	cb?: () => void;
}

const Options = ({cb}: IProps) => {
	const [minutes, setMinutes] = useState<number>(30);
	const clickHandler = () => {
		chrome.storage.local.set({defaultTime: {
			hours: 0,
			minutes: +minutes,
			seconds: 0
		}})
	}
	useEffect(() => {
		chrome.storage.local.get('defaultTime').then(result => {
			if (result.defaultTime) {
				setMinutes(result.defaultTime.minutes)
			}
		})
	}, [])
	return (
		<div className={styles.options}>
			<Input
				value={minutes}
				onChange={(val) => setMinutes(+val)}
				id='minutes-input'
				label='Minutes'
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