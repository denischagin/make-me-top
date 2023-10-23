import { HTMLAttributes, MouseEventHandler } from 'react';

export interface UserRatingCardProps extends HTMLAttributes<HTMLDivElement>{
    fullname: string
    title: string
    index?: number
    rating?: number | null
}