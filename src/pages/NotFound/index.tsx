import { BackgroundProfile } from "@shared/ui/BackgroundProfile";
import { Container } from "@shared/ui/Container";
import { Typography } from "@shared/ui/Typography";
import {
	typographyColor,
	typographyVariant,
} from "@shared/ui/Typography/interfaces";
import { bem } from "@shared/utils/bem";
import { Header } from "@widgets/Header";
import "./style.scss";

const NotFound = ({ errorCode = 404 }: { errorCode?: number | string }) => {
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

export default NotFound