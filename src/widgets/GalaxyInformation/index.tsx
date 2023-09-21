import React from "react";
import { bem } from "@shared/utils/bem";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { Button } from "@shared/Button";
import { buttonSize } from "@shared/Button/interfaces";
import { KeeperRatingCard } from "@shared/KeeperRatingCard";
import { getUserFullName } from "@shared/utils/getUserFullName";
import { GalaxyInformationProps } from "./interface";

export const GalaxyInformation: React.FC<GalaxyInformationProps> = ({
	galaxyDescription,
	keepers,
	handleHideAll,
	handleShowMore,
	isLastLimit,
}) => {
	const [block, element] = bem("galaxies-page");

	return (
		<>
			<div className={element("information-description")}>
				<Typography variant={typographyVariant.h2}>
					Описание галактики
				</Typography>
				<Typography variant={typographyVariant.regular14}>
					{galaxyDescription}
				</Typography>
			</div>

			<div className={element("keepers-section")}>
				<Typography variant={typographyVariant.h2}>
					Преподаватели в этой галактике
				</Typography>
				<div className={element("keepers-list-wrapper")}>
					{keepers.length === 0 && (
						<Typography variant={typographyVariant.medium16}>
							У данной галактики нет хранителей
						</Typography>
					)}
					
					{keepers.map((keeper) => (
						<KeeperRatingCard
							key={keeper.personId}
							fullname={getUserFullName(keeper)}
						/>
					))}
				</div>

				<div>
					{keepers.length !== 0 &&
						(isLastLimit ? (
							<Button
								title="Скрыть всё"
								size={buttonSize.small}
								onClick={handleHideAll}
							/>
						) : (
							<Button
								title="Показать ещё"
								size={buttonSize.small}
								onClick={handleShowMore}
							/>
						))}
				</div>
			</div>
		</>
	);
};
