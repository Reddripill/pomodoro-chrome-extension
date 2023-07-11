import React, { useState } from 'react'
import styles from './Sidebar.module.scss'
import { AiFillSetting } from 'react-icons/ai';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { ImExit } from 'react-icons/im';
import classNames from 'classnames';
import Options from '../Options/Options';

const menuItems = [
	{
		name: 'settings',
		icon: <AiFillSetting />
	},
	{
		name: 'user',
		icon: <BiSolidUser />
	},
	{
		name: 'logOut',
		icon: <ImExit />
	},
]

type MenuItemType = 'settings' | 'user' | 'logOut';
// Change this type


const Sidebar = () => {
	const [activeItem, setActiveItem] = useState<MenuItemType | null>(null);
	return (
		<>
			<div className={classNames(styles.wrapper, { [styles._active]: activeItem })} />
			<div className={classNames(styles.container, { [styles._active]: activeItem })}>
				<ul className={classNames(styles.menu, { [styles._active]: activeItem })}>
					{menuItems.map(item => (
						<li
							className={classNames(styles['menu-item'], {[styles._active]: activeItem === item.name as MenuItemType})}
							onClick={() => setActiveItem(prev => {
								if (prev !== item.name) {
									return item.name as MenuItemType
								}
								return null
							})}
							key={item.name}
						>
							{item.icon}
						</li>
					))}
				</ul>
				<div className={styles.sidebar}>
					<div className={styles.head}>
						<div className={styles.text}>Pomodoro</div>
						<div className={styles.close} onClick={() => setActiveItem(null)}>
							<AiFillCloseCircle />
						</div>
					</div>
					<div className={styles.body}>
						<Options 
							cb={() => setActiveItem(null)}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar