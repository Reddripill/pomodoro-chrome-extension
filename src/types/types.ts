import React from 'react';

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>

export type StorageValueType<T> = {
   [T: string]: T
}