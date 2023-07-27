import { ITime } from "../components/Main/Main";

export interface IStringTime {
   hours: string;
   minutes: string;
   seconds: string;
}

export const timeStringConverter = (time: ITime | IStringTime): IStringTime => {
   let newTime: any = {};
   for (const key of Object.keys(time) as (keyof ITime)[]) {
      const item = time[key].toString()
      if (item.length === 1) {
         newTime[key] = '0' + item;
      } else {
         newTime[key] = item;
      }
   }
   console.log('NEW TIME: ', newTime);
   return newTime as IStringTime
}

export const timeNumberConverter = (time: IStringTime): ITime => {
   let newTime: any = {};
   for (const key of Object.keys(time) as (keyof IStringTime)[]) {
      newTime[key] = +time[key]
   }
   return newTime as ITime
}