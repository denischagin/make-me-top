import { Badge } from "@shared/ui/Badge";
import { badgeColor } from "@shared/ui/Badge/interfaces";
import { Typography } from "@shared/ui/Typography";
import {
	typographyColor,
	typographyVariant,
} from "@shared/ui/Typography/interfaces";
import { ExplorerBadgeByRequestStatusProps } from "@entities/homework/ui/ExplorerBadgeByRequestStatus/interface";
import { RequestStatusType } from "@entities/homework/model/types/api";
import { ReactElement } from "react";

export const ExplorerBadgeByRequestStatus = ({
	requestStatus,
	alreadyHaveMarkOnTheme,
}: ExplorerBadgeByRequestStatusProps) => {
	const badgeByRequestStatus: Record<RequestStatusType, ReactElement> = {
		EDITING: <Badge color={badgeColor.white}>Хранитель проверил задание</Badge>,
		CLOSED: (
			<>
				<Badge color={badgeColor.primary500}>
					Выполнено
				</Badge>
			</>
		),
		CHECKING: (
			<>
				<Badge color={badgeColor.black}>Ожидает проверки хранителя</Badge>
			</>
		),
	};

	return (
		<>
			{alreadyHaveMarkOnTheme && requestStatus !== "CLOSED" ? (
				<Badge color={badgeColor.black}>
					Вам не требуется выполнять это задание
				</Badge>
			) : requestStatus ? (
				badgeByRequestStatus[requestStatus]
			) : (
				<>
					<Badge color={badgeColor.white}>Невыполненное задание</Badge>
				</>
			)}
		</>
	);
};
