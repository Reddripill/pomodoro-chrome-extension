import React, { useState } from 'react'
import Main from '../Main/Main';
import Options from '../Option/Options';
import { AiFillSetting } from 'react-icons/ai';
import styles from './App.module.scss';

const App = () => {
	const [isActiveOptions, setIsActiveOptions] = useState<boolean>(false)
	return (
		<div className={styles.wrapper}>
			{!isActiveOptions &&
				<Main
					setOptions={() => setIsActiveOptions(true)}
				/>
			}
			{isActiveOptions &&
				<Options />
			}
		</div>
	)
}

export default App