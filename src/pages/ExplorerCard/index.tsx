import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import {
	explorerCardInfoSelector,
	explorersIsErrorSelector,
} from "@entities/explorer/model/selectors";
import { getExplorerCardInfo } from "@entities/explorer/thunks/getExplorerCardInfo";

import { ArrowButton } from "@shared/ui/ArrowButton";
import { BackgroundProfile } from "@shared/ui/BackgroundProfile";
import { EducationApplicationCard } from "@shared/ui/EducationApplicationCard";
import { ExplorerApplicationCard } from "@shared/ui/ExplorerApplicationCard";
import { ReviewRequestCard } from "@shared/ui/ReviewRequestCard";
import { Typography } from "@shared/ui/Typography";

import { bem } from "@shared/utils/bem";

import { ExplorerCardUserInfo } from "@widgets/ExplorerCardUserInfo";
import { Header } from "@widgets/Header";
import { Reviews } from "@widgets/Reviews";
import { SystemsList } from "@widgets/SystemsList";

import { arrowButtonDirection } from "@shared/ui/ArrowButton/interfaces";
import {
	typographyColor,
	typographyVariant,
} from "@shared/ui/Typography/interfaces";

import "./styles.scss";
import { Container } from "@shared/ui/Container";
import NotFound from "@pages/NotFound";

const ExplorerCard = () => {
	const [block, element] = bem("explorer-card");

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userInfo = useAppSelector(explorerCardInfoSelector);
	const isError = useAppSelector(explorersIsErrorSelector);

	const { investigatedSystems, studyRequest } = userInfo;

	const { explorerId } = useParams();

	useEffect(() => {
		dispatch(
			getExplorerCardInfo({
				explorerId: Number(explorerId),
			})
		);
	}, [explorerId]);

	if (isError) return <NotFound />;
	return (
		<div className={block()}>
			<BackgroundProfile />
			<Header />
			<Container className={element("container")}>
				<div className={element("profile")}>
					<div className={element("back-arrow")}>
						<ArrowButton
							onClick={() => navigate(-1)}
							direction={arrowButtonDirection.left}
						/>
					</div>
					<ExplorerCardUserInfo />
				</div>
				<div className={element("content", "mt-5")}>
					<ReviewRequestCard />
					<ExplorerApplicationCard />
					<SystemsList
						heading="Освоенные системы"
						systems={investigatedSystems}
					/>
					<Reviews />
				</div>
			</Container>
		</div>
	);
};

export default ExplorerCard