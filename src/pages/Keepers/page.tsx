import { BackgroundUsersList } from "@shared/ui/BackgroundUsersList";

import { bem } from "@shared/utils/bem";

import { Header } from "@widgets/Header";

import "./styles.scss";
import { KeepersList } from "@widgets/KeepersList";
import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";
import { keepersListSelector } from "@entities/keeper/model/selectors";
import { useEffect } from "react";
import { getListKeepersByFilter } from "@entities/keeper/thunks/getListKeepersByFilter";
import { useShowMore } from "@shared/utils/hooks/use-show-more";
import { Button } from "@shared/ui/Button";
import { buttonSize } from "@shared/ui/Button/interfaces";
import { SortCard } from "@shared/ui/SortCard";
import { Container } from "@shared/ui/Container";
import { loadingIsLoadingSelector } from "@entities/loading/model/selectors";

const Keepers = () => {
	const [block, element] = bem("keepers");
	const keepersList = useAppSelector(keepersListSelector);
	const isLoading = useAppSelector(loadingIsLoadingSelector);
	const dispatch = useAppDispatch();

	const { handleHideAll, handleShowMore, isLastLimit, limitElements } =
		useShowMore(keepersList, 10, 5);

	useEffect(() => {
		dispatch(getListKeepersByFilter({}));
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

					{keepersList.length !== 0 && <KeepersList keepers={limitElements} />}

					{keepersList?.length !== 0 && isLastLimit ? (
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

export default Keepers;
