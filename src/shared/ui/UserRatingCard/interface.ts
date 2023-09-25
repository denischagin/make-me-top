import { MouseEventHandler } from "react";

export interface UserRatingCardProps {
    fullname: string
    title: string
    index?: number
    rating?: number | null
    onClick?: MouseEventHandler<HTMLDivElement>
}