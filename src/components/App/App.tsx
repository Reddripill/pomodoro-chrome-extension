import React, {useEffect, useState} from 'react'
import Main, { ITime } from '../Main/Main';
import Options from '../Options/Options';
import styles from './App.module.scss';
import { PortContext } from '../../providers/PortProvider';
import { MessageType } from '../../types/types';
import { ITimerProperties } from '../../scripts/background';


const App = () => {
   const [timerPropertiesState, setTimerPropertiesState] = useState<ITimerProperties | null>(null);
	useEffect(() => {
		const timerPort = chrome.runtime.connect({name: 'timer'});
		const messageHandler = (message: MessageType) => {
			if (message.target === 'popup') {
            setTimerPropertiesState(message.data as ITimerProperties)
         }
		}
		timerPort.onMessage.addListener(messageHandler)
		return () => {
			timerPort.onMessage.removeListener(messageHandler);
			timerPort.disconnect()
		}
	}, [])
	return (
		<>
			{timerPropertiesState &&
				<PortContext.Provider value={{timerProperties: timerPropertiesState}}>
					<div className={styles.wrapper}>
						<Main />
					</div>
				</PortContext.Provider>
			}
		</>
	)
}

export default App