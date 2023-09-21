import React from "react";
import { ButtonChangeCurrentGalaxyProps } from "./interface";
import { ReactComponent as Orbit1 } from "@shared/images/change-current-galaxy1.svg";
import { ReactComponent as Orbit2 } from "@shared/images/change-current-galaxy2.svg";
import { ReactComponent as Orbit3 } from "@shared/images/change-current-galaxy3.svg";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { bem } from "@shared/utils/bem";
import './style.scss'

export const ButtonChangeCurrentGalaxy = ({
	content,
	onClick,
}: ButtonChangeCurrentGalaxyProps) => {
	const [block, element] = bem("change-galaxy-button");
	return (
		<button onClick={onClick} className={block()}>
			<Orbit1 className={element('orbit', 'orbit1')} />
			<Orbit2 className={element('orbit', 'orbit2')} />
			<Orbit3 className={element('orbit', 'orbit3')} />
			<Typography variant={typographyVariant.medium14}>{content}</Typography>
		</button>
	);
};
