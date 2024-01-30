import { Typography } from "@shared/ui/Typography";
import { typographyVariant } from "@shared/ui/Typography/interfaces";
import { Button } from "@shared/ui/Button";
import { buttonColor, buttonSize } from "@shared/ui/Button/interfaces";
import { ExplorerBadgeByRequestStatus } from "@entities/homework/ui/ExplorerBadgeByRequestStatus";
import { bem, useShowAllText } from "@shared/utils";
import { HomeworkIssueProps } from "@entities/homework/ui/HomeworkIssue/interface";

export const HomeworkIssue = ({
	homeworkId,
	content,
	status,
	title,
	alreadyHaveMarkOnTheme,
	homeworkIndex,
	onHomeworkClick,
}: HomeworkIssueProps) => {
	const [, element] = bem("homework-issues");
	const { slicedText: titleSliced } = useShowAllText({
		text: title,
		initTextLength: 100,
	});
	const { slicedText: contentSliced } = useShowAllText({
		text: content,
		initTextLength: 300,
	});

	return (
		<div className={element("item")} key={homeworkId}>
			<Typography className={element("content")} variant={typographyVariant.h3}>
				{homeworkIndex + 1}. {titleSliced}
			</Typography>

			<Typography
				className={element("content")}
				variant={typographyVariant.regular16}
				parseLink
			>
				{contentSliced}
			</Typography>

			<div className={element("bottom-panel")}>
				{!(alreadyHaveMarkOnTheme && status?.status !== "CLOSED") && (
					<Button
						className={element("button-homework")}
						title={"Перейти"}
						size={buttonSize.small}
						color={buttonColor.filled}
						onClick={onHomeworkClick}
					/>
				)}

				<div className={element("badge")}>
					<ExplorerBadgeByRequestStatus
						requestStatus={status?.status}
						alreadyHaveMarkOnTheme={alreadyHaveMarkOnTheme}
					/>
				</div>
			</div>
		</div>
	);
};
