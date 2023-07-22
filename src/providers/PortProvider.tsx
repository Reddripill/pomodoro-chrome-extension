import React from 'react'
import { ITimerProperties } from '../scripts/background';

interface IContext {
	timerProperties: ITimerProperties | null;
}

export const PortContext = React.createContext<IContext>({timerProperties: null});
