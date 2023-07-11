import React, {useEffect, useState} from 'react'
import Main, { ITime } from '../Main/Main';
import Options from '../Options/Options';
import styles from './App.module.scss';



const App = () => {
	const [time, setTime] = useState<ITime | null>(null)
	const port = chrome.runtime.connect({name: 'timer'});
	useEffect(() => {
		const messageHandler = (message: any) => {
			console.log('POPUP MESSAGE: ', message);
			setTime(Object.assign({}, message.timerMessage.time));
		}
		port.onMessage.addListener(messageHandler)
		return () => {
			port.onMessage.removeListener(messageHandler)
		}
	}, [])
	return (
		<>
			{time &&
				<div className={styles.wrapper}>
					<Main time={time} port={port} />
				</div>
			}
		</>
	)
}

export default App