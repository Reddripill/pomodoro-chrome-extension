import React, {useContext} from 'react'
import styles from './Timer.module.scss';
import timerConverter from '../../../utils/timerConverter';
import timerProgress from '../../../utils/timerProgress';
import { PortContext } from '../../../providers/PortProvider';


const Timer = () => {
   const { timerProperties } = useContext(PortContext);
	return (
		<div className={styles.timer}>
			<svg viewBox='0 0 240 240'>
				<g className={styles.group}>
					<circle className={styles.circle} cx='120' cy='120' r='112'/>
					<path
						className={styles.path}
						d='
							M 120 120
							m -112 0
							a 112 112 0 0 0 224 0
							a 112 112 0 0 0 -224 0
						'
						strokeDasharray={timerProgress(timerProperties.fullTime, timerProperties.time, 704)}
					/>
				</g>
			</svg>
			<div className={styles.time}>{timerConverter(timerProperties.time)}</div>
		</div>
	)
}

export default Timer