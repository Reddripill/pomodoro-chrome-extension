import React, {useEffect, useState} from 'react'
import Main, { ITime } from '../Main/Main';
import Options from '../Options/Options';
import styles from './App.module.scss';
import { PortContext } from '../../providers/PortProvider';
import { StorageValueType } from '../../types/types';
import { ITimerProperties } from '../../scripts/background';



const App = () => {
	const [time, setTime] = useState<ITime | null>(null);
	const [fullTime, setFullTime] = useState<ITime | null>(null);
   const [timerPropertiesState, setTimerPropertiesState] = useState<ITimerProperties | null>(null)
	useEffect(() => {
		const timerPort = chrome.runtime.connect({name: 'timer'});
		const messageHandler = ({timerProperties}: StorageValueType<ITimerProperties>) => {
			setTime(timerProperties.time);
			setFullTime(timerProperties.fullTime);
         setTimerPropertiesState(timerProperties)
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