import React, {useEffect, useState} from 'react'
import styles from './Timer.module.scss';
import cn from 'classnames';
import { ITime } from '../../Main/Main';
import timerConverter from '../../../utils/timerConverter';

interface IProps {
	time: ITime;
}

const Timer = ({time}: IProps) => {
	const [fullTime, setFullTime] = useState<ITime>(time)
	useEffect(() => {
		chrome.storage.local.get('fullTime').then(result => {
			setFullTime(result.fullTime);
		})
	}, [])
	useEffect(() => {
		const fullTimeSeconds = fullTime.seconds + fullTime.minutes * 60 + fullTime.hours * 3600; 
		const currentTimeSeconds = time.seconds + time.minutes * 60 + time.hours * 3600;
		console.log('CURRENTTIME: ', currentTimeSeconds);
		console.log('FULLTIME: ', fullTimeSeconds);
		const angle = ((currentTimeSeconds / fullTimeSeconds) * 360);
		console.log(angle);
	}, [time])
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