import React, { useState, useContext } from 'react'
import styles from './Options.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { ITime } from '../Main/Main';
import { PortContext } from '../../providers/PortProvider';

interface IProps {
	cb?: () => void;
}

const Options = ({cb}: IProps) => {
	const [minutes, setMinutes] = useState<number | string>(30);
	const {port} = useContext(PortContext);
	const clickHandler = () => {
		port.postMessage({time: {
			hours: 0,
			minutes: +minutes,
			seconds: 0
		} as ITime})
	}
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