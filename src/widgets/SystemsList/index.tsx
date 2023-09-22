import { Rating } from "@shared/Rating";
import System from "@shared/System";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { SystemsListInterface } from "./interfaces";
import {
	ratingScoreColor,
	ratingSize,
	ratingSystemColor,
} from "@shared/Rating/interfaces";
import { systemColor } from "@shared/System/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

export const SystemsList = (props: SystemsListInterface) => {
	const { heading, systems } = props;

	const [block, element] = bem("systems-list");

	if (!systems?.length) {
		return null;
	}

	return (
		<div className={block()}>
			<Typography
				className={element("heading", "mt-5 mb-4")}
				variant={typographyVariant.h2}
			>
				{heading}
			</Typography>
			<div className={element("systems", "mb-4")}>
				{systems?.map((system) => (
					<System color={systemColor.primary500} key={system.courseId}>
						<p className={element("label")}>{system.title}</p>
						<div className={element("system-rating")}>
							<Rating
								scoreColor={ratingScoreColor.white}
								rating={system.rating}
								size={ratingSize.small}
								systemColor={ratingSystemColor.white}
							/>
						</div>
					</System>
				))}
			</div>
		</div>
	);
};
