import React from 'react';

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>

export type StorageValueType<T> = {
   [T: string]: T
}

export type MessageType<T = any> = {
   target: string;
   data: T
}

export type AudioValuesType = {
   source: string;
   volume: number;
}