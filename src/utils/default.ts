import { ITime } from "../components/Main/Main"

const defaultTime = {
	hours: 0,
	minutes: 1,
	seconds: 0
}

export interface ISound {
   isSelected: boolean;
   name: string;
}

export interface ITimerProperties {
   time: ITime,
   fullTime: ITime,
   defaultChillTime: ITime,
   defaultJobTime: ITime,
   mode: 'Job' | 'Chill',
   isStarted: boolean,
   isComplete: boolean,
   timestamp: null | NodeJS.Timer,
   status: 'Stop' | 'Start',
   sounds: ISound[]
}

export const defatultTimerProperties: ITimerProperties = {
   time: defaultTime,
   fullTime: defaultTime,
   defaultChillTime: defaultTime,
   defaultJobTime: defaultTime,
   mode: 'Job',
   isStarted: false,
   isComplete: false,
   timestamp: null,
   status: 'Stop',
   sounds: [
      {
         isSelected: true,
         name: 'mainSound'
      },
      {
         isSelected: false,
         name: 'Sound1'
      },
      {
         isSelected: false,
         name: 'Sound2'
      },
      {
         isSelected: false,
         name: 'Sound3'
      },
      {
         isSelected: false,
         name: 'Sound4'
      },
      {
         isSelected: false,
         name: 'Sound5'
      },
      {
         isSelected: false,
         name: 'Sound6'
      },
      {
         isSelected: false,
         name: 'Sound7'
      },
      {
         isSelected: false,
         name: 'Sound8'
      },
      {
         isSelected: false,
         name: 'Sound9'
      },
   ]
}