import { useGetHomeworkRequest } from "@entities/homework";
import { GradeRadioButtonSection } from "@shared/ui/GradeRadioButtonSection";
import { Typography } from "@shared/ui/Typography";
import { typographyVariant } from "@shared/ui/Typography/interfaces";
import { bem } from "@shared/utils/helpers/bem";
import './styles.scss'

export const GradeWithComment = () => {
    const [block, element] = bem('grade-with-comment')

    const getHomeworkRequest = useGetHomeworkRequest();
    const requestsInfo = getHomeworkRequest?.data;

    const markObject = requestsInfo?.request?.mark;

    return (
        <>
            <GradeRadioButtonSection currentGrade={markObject?.mark} />

            <Typography variant={typographyVariant.h2}>
                Комментарий к оценке
            </Typography>

            <Typography
                variant={typographyVariant.medium16}
                className={element('comment')}
            >
                {markObject?.comment}
            </Typography>
        </>

    )
}