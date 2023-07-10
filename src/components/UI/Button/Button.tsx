import React, { PropsWithChildren } from 'react'
import styles from './Button.module.scss'

interface IProps {
	clickHandler?: () => void;
	type: 'button' | 'submit';
}

const Button = ({clickHandler, type, children}: PropsWithChildren<IProps>) => {
	return (
		<button
			type={type}
			onClick={clickHandler}
			className={styles.button}
			onSubmit={type === 'submit' ? clickHandler : undefined}
		>
			{children}
		</button>
	)
}

export default Button