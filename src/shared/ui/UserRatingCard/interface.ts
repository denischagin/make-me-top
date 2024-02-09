import { HTMLAttributes, MouseEventHandler } from 'react';

export interface UserRatingCardProps extends HTMLAttributes<HTMLDivElement>{
    personId: number
    fullname: string
    title: string
    index?: number
    rating?: number | null
}