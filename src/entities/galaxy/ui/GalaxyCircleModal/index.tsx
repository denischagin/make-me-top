import { TABS_LIST } from "@pages/Explorer/model";
import { Button } from "@shared/Button";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
import { CircleModal } from "@shared/CircleModal";
import { CurrentUserItem } from "@shared/CurrentUserItem";
import { DividingLine } from "@shared/DividingLine";
import { DividingLineColor } from "@shared/DividingLine/interfaces";
import { FinalGrade } from "@shared/FinalGrade";
import { MmtTabs } from "@shared/MmtTabs";
import { PlanetList } from "@shared/PlanetList";
import { SelectUsersList } from "@shared/SelectUsersList";
import { UsersList } from "@shared/UsersList";
import { bem } from "@shared/utils/bem";
import { TabPanel } from "react-tabs";
import { GalaxyCircleModalProp } from "./interface";
import "./style.scss";
import { useState } from "react";
import { Typography } from "@shared/Typography";
import {
	typographyColor,
	typographyVariant,
} from "@shared/Typography/interfaces";

export const GalaxyCircleModal = ({
	lastChosenSystem,
	onClose,
	userProgress,
	you,
	keepers,
	course,
	yourKeeper,
	explorers,
	courseId,
	isOpen,
}: GalaxyCircleModalProp) => {
	const [block, element] = bem("galaxy-circle-modal");
	const [activeTab, setActiveTab] = useState(0);

	const systemIsOpen = userProgress.openedSystems.some(
		(systemId) => systemId === lastChosenSystem.systemId
	);

	return (
		<CircleModal
			isOpen={isOpen}
			header={lastChosenSystem.systemName}
			data={{
				lastChosenSystem,
				userProgress,
			}}
			isLocked={lastChosenSystem.isLocked}
			onClose={onClose}
		>
			<div className={element("send-button")}>
				{systemIsOpen && (
					<Button
						color={buttonColor.filled}
						size={buttonSize.large}
						title="Отправить заявку"
						onClick={() => setActiveTab(2)}
					/>
				)}
			</div>
			{
				<MmtTabs
					list={TABS_LIST}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				>
					<TabPanel>
						<PlanetList currentPlanet={course.title} />
						<FinalGrade />
					</TabPanel>
					<TabPanel>
						{!!you && (
							<>
								<CurrentUserItem explorer={you} badgeTitle="Мой рейтинг" />
								<DividingLine color={DividingLineColor.gray500} />
							</>
						)}
						{explorers?.length !== 0 ? (
							<UsersList explorersList={explorers} />
						) : (
							<div className={element("empty-text")}>
								<Typography
									variant={typographyVariant.medium16}
									color={typographyColor.black}
								>
									У данного курса нет исследователей
								</Typography>
							</div>
						)}
					</TabPanel>
					<TabPanel>
						{!!yourKeeper && (
							<>
								<CurrentUserItem
									keeper={yourKeeper}
									badgeTitle="Мой хранитель"
								/>
								<DividingLine color={DividingLineColor.gray500} />
							</>
						)}
						{!yourKeeper?.personId ? (
							keepers?.length !== 0 ? (
								<SelectUsersList keepersList={keepers} courseId={courseId} />
							) : (
								<div className={element("empty-text")}>
									<Typography
										variant={typographyVariant.medium16}
										color={typographyColor.black}
									>
										У данного курса нет хранителей
									</Typography>
								</div>
							)
						) : (
							<UsersList keepersList={keepers} />
						)}
					</TabPanel>
				</MmtTabs>
			}
		</CircleModal>
	);
};
