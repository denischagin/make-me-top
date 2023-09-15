import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import {
	explorerCardInfoSelector,
	explorersIsErrorSelector,
} from "@entities/explorer/model/selectors";
import { getExplorerCardInfo } from "@entities/explorer/thunks/getExplorerCardInfo";

import { ArrowButton } from "@shared/ArrowButton";
import { BackgroundProfile } from "@shared/BackgroundProfile";
import { EducationApplicationCard } from "@shared/EducationApplicationCard";
import { ExplorerApplicationCard } from "@shared/ExplorerApplicationCard";
import { ReviewRequestCard } from "@shared/ReviewRequestCard";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { ExplorerCardUserInfo } from "@widgets/ExplorerCardUserInfo";
import { Header } from "@widgets/Header";
import { Reviews } from "@widgets/Reviews";
import { SystemsList } from "@widgets/SystemsList";

import { arrowButtonDirection } from "@shared/ArrowButton/interfaces";
import {
	typographyColor,
	typographyVariant,
} from "@shared/Typography/interfaces";

import "./styles.scss";
import { Container } from "@shared/Container";

export const ExplorerCard = () => {
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

	if (isError)
		return (
			<>
				<BackgroundProfile />
				<div className={block()}>
					<Header />
					<Container>
						<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
							<Typography
								variant={typographyVariant.h1}
								color={typographyColor.white}
							>
								Возникла ошибка 404
							</Typography>
						</div>
					</Container>
				</div>
			</>
		);
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
