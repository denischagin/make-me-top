import { ReactNode } from 'react';

export interface SystemInterface {
  color: systemColor,
  children: ReactNode,
  percentageProgress?: number,
}

export enum systemColor {
  primary500 = 'primary-500',
  white = 'white',
  black = 'black'
}
