import { BackgroundProfile } from "@shared/BackgroundProfile";
import { Container } from "@shared/Container";
import { Typography } from "@shared/Typography";
import {
	typographyColor,
	typographyVariant,
} from "@shared/Typography/interfaces";
import { bem } from "@shared/utils/bem";
import { Header } from "@widgets/Header";
import "./style.scss";

export const NotFound = ({ errorCode = 404 }: { errorCode?: number | string }) => {
	const [block, element] = bem("not-found");

	return (
		<>
			<BackgroundProfile />
			<div className={block()}>
				<Header />
				<Container>
					<div className={element("content")}>
						<Typography
							variant={typographyVariant.h1}
							color={typographyColor.white}
						>
							Возникла ошибка {errorCode}
						</Typography>
					</div>
				</Container>
			</div>
		</>
	);
};
