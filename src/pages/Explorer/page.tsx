import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import {
	explorerInfoSelector,
	explorersIsErrorSelector,
} from "@entities/explorer/model/selectors";
import { getExplorerInfo } from "@entities/explorer/thunks/getExplorerInfo";

import { BackgroundProfile } from "@shared/BackgroundProfile";
import { MasteringApplication } from "@shared/MasteringApplication";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { CurrentSystemCard } from "@widgets/CurrentSystemCard";
import { ExplorerUserInfo } from "@widgets/ExplorerUserInfo";
import { Header } from "@widgets/Header";
import { RatingCard } from "@widgets/RatingCard";
import { SystemsList } from "@widgets/SystemsList";

import {
	typographyColor,
	typographyVariant,
} from "@shared/Typography/interfaces";

import { TABS_LIST } from "./model";

import "./styles.scss";
import { Container } from "@shared/Container";
import NotFound from "@pages/NotFound";
import { Button } from "@shared/Button";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
import { useNavigate } from "react-router-dom";
import { URL_GALAXY } from "@shared/constants/links";

export const Explorer = () => {
	const [block, element] = bem("explorer");
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const userInfo = useAppSelector(explorerInfoSelector);
	const isError = useAppSelector(explorersIsErrorSelector);

	const { investigatedSystems } = userInfo;

	useEffect(() => {
		dispatch(getExplorerInfo({}));
	}, []);

	if (isError) return <NotFound />;

	return (
		<>
			<BackgroundProfile />
			<div className={block()}>
				<Header />
				<Container className={element("container")}>
					<div className={element("row", "row")}>
						<div className={element("profile", "col-xxl-9")}>
							<ExplorerUserInfo />

							<div className={element("current-system")}>
								<CurrentSystemCard tabsList={TABS_LIST} />
								<MasteringApplication />
							</div>

							<div className={element("button-galaxy")}>
								<Button
									title="Переход на страницу с галактиками"
									size={buttonSize.large}
									color={buttonColor.filled}
									onClick={() => navigate(URL_GALAXY)}
								/>
							</div>
							
							<div className={element("completed-systems")}>
								<SystemsList
									heading="Освоенные системы"
									systems={investigatedSystems}
								/>
							</div>
						</div>

						<div className={element("rating", "col-xxl-3")}>
							<Typography
								variant={typographyVariant.h2}
								className={element("rating-heading", "mt-1 mb-4")}
							>
								Рейтинг
							</Typography>
							<RatingCard />
						</div>
					</div>
				</Container>
			</div>
		</>
	);
};
