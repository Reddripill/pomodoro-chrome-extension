import React, { useState } from 'react'
import Main from './Main';
import Options from './Options';
import { AiFillSetting } from 'react-icons/ai'

const App = () => {
	const [isActiveOptions, setIsActiveOptions] = useState<boolean>(false)
	return (
		<div>
			{!isActiveOptions &&
				<Main
					setOptions={() => setIsActiveOptions(true)}
				/>
			}
			{isActiveOptions &&
				<Options />
			}
			<div>Block</div>
		</div>
	)
}

export default App