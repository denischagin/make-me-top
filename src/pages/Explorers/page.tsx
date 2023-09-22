import { bem } from "@shared/utils/bem";
import { BackgroundUsersList } from "@shared/BackgroundUsersList";

import { Header } from "@widgets/Header";

import "./styles.scss";
import { Card } from "@shared/Card";
import { cardSize } from "@shared/Card/interfaces";
import { ExplorersList } from "@widgets/ExplorersList";
import { Button } from "@shared/Button";
import { buttonSize } from "@shared/Button/interfaces";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";
import { explorersListSelector } from "@entities/explorer/model/selectors";
import { useEffect, useState } from "react";
import { getListExplorersByFilter } from "@entities/explorer/thunks/getFilterExplorers";
import { useShowMore } from "@shared/utils/hooks/use-show-more";
import { SortCard } from "@shared/SortCard";
import { Container } from "@shared/Container";

const Explorers = () => {
	const explorersList = useAppSelector(explorersListSelector);

	const { handleHideAll, handleShowMore, isLastLimit, limitElements } =
		useShowMore(explorersList, 10, 5);

	const dispatch = useAppDispatch();

	const [block, element] = bem("explorers");

	useEffect(() => {
		dispatch(getListExplorersByFilter({}));
	}, []);

	return (
		<div className={block()}>
			<BackgroundUsersList />
			<Header />
			<Container className={element("container")}>
				<div className={element("sort-panel")}>
                    <SortCard title="Сортировать" value="С 1 до конца"/>
                    <SortCard title="Период отображения" value="За весь период"/>
                    <SortCard title="За весь период" value="Все звезды"/>
				</div>

				<ExplorersList explorers={limitElements} />

				{explorersList?.length !== 0 && isLastLimit ? (
					<Button
						size={buttonSize.large}
						title="Скрыть всё"
						onClick={handleHideAll}
					/>
				) : (
					<Button
						size={buttonSize.large}
						title="Показать еще"
						onClick={handleShowMore}
					/>
				)}
			</Container>
		</div>
	);
};

export default Explorers