import React, {useEffect, useState} from 'react'
import Main, { ITime } from '../Main/Main';
import Options from '../Options/Options';
import styles from './App.module.scss';
import { PortContext } from '../../providers/PortProvider';



const App = () => {
	const [time, setTime] = useState<number>(0);
	const [port, setPort] = useState<chrome.runtime.Port | null>(null)
	useEffect(() => {
		const timerPort = chrome.runtime.connect({name: 'timer'});
		setPort(timerPort)
		const messageHandler = (message: any) => {
			console.log('POPUP MESSAGE: ', message);
			setTime(message.count)
		}
		timerPort.onMessage.addListener(messageHandler)
		return () => {
			timerPort.onMessage.removeListener(messageHandler);
			timerPort.disconnect()
		}
	}, [])
	return (
		<>
			<PortContext.Provider value={{port}}>
				<div className={styles.wrapper}>
					<Main time={time} />
				</div>
			</PortContext.Provider>
		</>
	)
}

export default App