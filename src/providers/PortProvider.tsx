import React from 'react'
import { ITimerProperties } from '../utils/default';

interface IContext {
	timerProperties: ITimerProperties | null;
}

export const PortContext = React.createContext<IContext>({timerProperties: null});
