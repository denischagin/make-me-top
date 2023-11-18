import { bem } from "@shared/utils/helpers/bem"
import { GradeRadioButtonProps } from "./interface"
import { Typography } from "../Typography"
import { typographyColor, typographyVariant } from "../Typography/interfaces"
import "./styles.scss"

export const GradeRadioButton = ({ active, onClick, children }: GradeRadioButtonProps) => {
    const [block] = bem("grade-radio-button")

    return (
        <div
            onClick={onClick}
            className={block({
                active
            })}>
            <Typography
                variant={typographyVariant.h2}
                color={active ? typographyColor.white : typographyColor.black}
            >
                {children}
            </Typography>
        </div>
    )
}