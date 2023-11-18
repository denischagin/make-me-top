import { ReactNode } from "react"

export interface GradeRadioButtonProps {
    active: boolean
    onClick: () => void
    children: ReactNode
}