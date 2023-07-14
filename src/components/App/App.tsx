import React, {useEffect, useState} from 'react'
import Main, { ITime } from '../Main/Main';
import Options from '../Options/Options';
import styles from './App.module.scss';
import { PortContext } from '../../providers/PortProvider';



const App = () => {
	const [time, setTime] = useState<ITime | null>(null);
	const [fullTime, setFullTime] = useState<ITime | null>(null);
	const [port, setPort] = useState<chrome.runtime.Port | null>(null)
	useEffect(() => {
		const timerPort = chrome.runtime.connect({name: 'timer'});
		setPort(timerPort)
		const messageHandler = (message: any) => {
			setTime(message.time);
			setFullTime(message.fullTime);
			console.log('MESSAGE: ', message);
		}
		timerPort.onMessage.addListener(messageHandler)
		return () => {
			timerPort.onMessage.removeListener(messageHandler);
			timerPort.disconnect()
		}
	}, [])
	return (
		<>
			{time &&
				<PortContext.Provider value={{port}}>
					<div className={styles.wrapper}>
						<Main time={time} fullTime={fullTime} />
					</div>
				</PortContext.Provider>
			}
		</>
	)
}

export default App