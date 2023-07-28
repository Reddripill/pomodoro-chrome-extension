import React, {useState, useContext} from 'react'
import styles from './AudioDropDown.module.scss'
import cn from 'classnames'
import { PortContext } from '../../../providers/PortProvider';
import { ISound } from '../../../utils/default';
import { fetchAndTestAudio } from '../../../utils/audioManager';
import {BiSolidDownArrow} from 'react-icons/bi'


const AudioDropDown = () => {
   const {timerProperties} = useContext(PortContext);
   const activeSound = timerProperties.sounds.find(item => item.isSelected === true)
   const [active, setActive] = useState<string>(activeSound.name);
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const clickHandler = async (sound: ISound) => {
      setActive(sound.name);
      await fetchAndTestAudio(sound.name);
      setIsOpen(false)
      const newSoundArray = timerProperties.sounds.map(item => ({
         ...item,
         isSelected: item === sound
      }))
      chrome.storage.local.set({timerProperties: {
         ...timerProperties,
         sounds: newSoundArray
      }})
   }
   return (
      <div className={styles.wrapper}>
         <div className={styles.visible}
            onClick={() => setIsOpen(!isOpen)}
         >
            <div className={styles.title}>
               {active}
            </div>
            <div className={styles.arrow}>
               <BiSolidDownArrow 
                  style={{
                     fontSize: 14
                  }}
               />
            </div>
         </div>
         <ul 
            className={cn(styles.menu, {[styles._open]: isOpen})}
         >
            {timerProperties.sounds.map(item => (
               <li 
                  key={item.name} 
                  className={cn(styles.item, {[styles._active]: item.name === active})}
                  onClick={() => clickHandler(item)}
               >
                  <div>{item.name}</div>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default AudioDropDown