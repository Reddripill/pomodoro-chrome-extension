import React, { useState } from 'react'
import styles from './Options.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

interface IProps {
	cb?: () => void;
}

const Options = ({cb}: IProps) => {
	const [minutes, setMinutes] = useState<number | string>(30)
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