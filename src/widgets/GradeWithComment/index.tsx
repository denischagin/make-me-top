import { useGetHomeworkRequest } from "@entities/homework";
import { Badge } from "@shared/ui/Badge";
import { badgeColor } from "@shared/ui/Badge/interfaces";
import { Typography } from "@shared/ui/Typography";
import {
	typographyColor,
	typographyVariant,
} from "@shared/ui/Typography/interfaces";
import { bem } from "@shared/utils/helpers/bem";
import "./styles.scss";

export const GradeWithComment = () => {
	const [block, element] = bem("grade-with-comment");

	const getHomeworkRequest = useGetHomeworkRequest();
	const requestsInfo = getHomeworkRequest?.data;

	const markObject = requestsInfo?.request?.mark;

	return (
		<>
			{/* <GradeRadioButtonSection currentGrade={markObject?.mark} /> */}

			<span>
				<Badge color={badgeColor.primary500}>Задание выполнено</Badge>
			</span>

			{!!markObject?.comment && (
				<>
					<Typography variant={typographyVariant.h2}>
						Комментарий к оценке
					</Typography>

					<Typography
						variant={typographyVariant.medium16}
						className={element("comment")}
						parseLink
					>
						{markObject?.comment}
					</Typography>
				</>
			)}
		</>
	);
};
