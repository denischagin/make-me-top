import { bem } from "@shared/utils/bem";
import { BackgroundUsersList } from "@shared/ui/BackgroundUsersList";

import { Header } from "@widgets/Header";

import "./styles.scss";
import { Card } from "@shared/ui/Card";
import { cardSize } from "@shared/ui/Card/interfaces";
import { ExplorersList } from "@widgets/ExplorersList";
import { Button } from "@shared/ui/Button";
import { buttonSize } from "@shared/ui/Button/interfaces";
import { Typography } from "@shared/ui/Typography";
import { typographyVariant } from "@shared/ui/Typography/interfaces";
import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";
import { explorersListSelector } from "@entities/explorer/model/selectors";
import { useEffect, useState } from "react";
import { getListExplorersByFilter } from "@entities/explorer/thunks/getFilterExplorers";
import { useShowMore } from "@shared/utils/hooks/use-show-more";
import { SortCard } from "@shared/ui/SortCard";
import { Container } from "@shared/ui/Container";
import { loadingIsLoadingSelector } from "@entities/loading/model/selectors";

const Explorers = () => {
	const explorersList = useAppSelector(explorersListSelector);

	const { handleHideAll, handleShowMore, isLastLimit, limitElements } =
		useShowMore(explorersList, 10, 5);

	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(loadingIsLoadingSelector);

	const [block, element] = bem("explorers");

	useEffect(() => {
		dispatch(getListExplorersByFilter({}));
	}, []);

	return (
		<div className={block()}>
			<BackgroundUsersList />
			<Header />
			{!isLoading && (
				<Container className={element("container")}>
					<div className={element("sort-panel")}>
						<SortCard title="Сортировать" value="С 1 до конца" />
						<SortCard title="Период отображения" value="За весь период" />
						<SortCard title="За весь период" value="Все звезды" />
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
			)}
		</div>
	);
};

export default Explorers;
