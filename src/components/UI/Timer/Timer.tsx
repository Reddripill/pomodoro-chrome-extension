import React, {useEffect} from 'react'
import styles from './Timer.module.scss';
import cn from 'classnames';
import { ITime } from '../../Main/Main';
import timerConverter from '../../../utils/timerConverter';

interface IProps {
	time: ITime;
	fullTime: ITime;
}

const Timer = ({time, fullTime}: IProps) => {
	useEffect(() => {
		const fullTimeSeconds = fullTime.seconds + fullTime.minutes * 60 + fullTime.hours * 3600; 
		const currentTimeSeconds = time.seconds + time.minutes * 60 + time.hours * 3600;
		const angle = 360 - (currentTimeSeconds / fullTimeSeconds) * 360;
	}, [time, fullTime])
	return (
		<div className={styles.container}>
			<div className={styles['main-circle']}>
				<div className={cn(styles.semicircle, styles['first-semicircle'])}/>
				<div className={cn(styles.semicircle, styles['second-semicircle'])}/>
				<div className={cn(styles.semicircle, styles['third-semicircle'])}/>
				<div className={styles.fullcircle}/>
				<div className={styles.time}>{timerConverter(time)}</div>
			</div>
		</div>
	)
}

export default Timer