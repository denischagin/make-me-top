import RingLoader from "react-spinners/RingLoader";
import axios from "axios";

import { useAppSelector } from "@app/providers/store/hooks";

import { loadingIsLoadingSelector } from "@entities/loading/model/selectors";

import { Portal } from "@shared/ui/Portal";

import { bem } from "@shared/utils/bem";

import "./styles.scss";

interface SpinnerProps {
	loading?: boolean;
}

export default function Spinner({ loading }: SpinnerProps) {
	const [block, element] = bem("spinner");

	const isLoading =
		loading !== undefined ? loading : useAppSelector(loadingIsLoadingSelector);

	if (!isLoading) {
		return null;
	}

	return (
		<Portal target={document.body}>
			<div className={block()}>
				<RingLoader
					color={"#ffffff"}
					size={90}
					className={element("loader")}
					aria-label="Загрузка"
					data-testid="loader"
				/>
			</div>
		</Portal>
	);
}
