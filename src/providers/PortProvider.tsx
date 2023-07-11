import React, {useState} from 'react'
import { SetStateType } from '../types/types';

interface IContext {
	port: chrome.runtime.Port | null;
}

export const PortContext = React.createContext<IContext>({port: null});
