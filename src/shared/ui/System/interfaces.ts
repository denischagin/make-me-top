import { ReactNode } from 'react';

export interface SystemInterface {
  children: ReactNode,
  color?: systemColor,
  percentageProgress?: number,
  className?: string
}

export enum systemColor {
  primary500 = 'primary-500',
  white = 'white',
  black = 'black'
}
