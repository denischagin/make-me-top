import { ShiningStar } from "@shared/ui/ShiningStar";
import { bem } from "@shared/utils/bem";
import React from "react";
import "./styles.scss";

export const BackgroundGalaxies = () => {
	const [block, element] = bem("background-galaxies-page");

	return (
		<div className={block()}>
			<div className={element("star-first")}>
				<ShiningStar size="small" />
			</div>
			<div className={element("star-second")}>
				<ShiningStar size="small" />
			</div>
			<div className={element("star-third")}>
				<ShiningStar size="small" />
			</div>
			<div className={element("star-fourth")}>
				<ShiningStar />
			</div>
			<div className={element("star-fifth")}>
				<ShiningStar />
			</div>
			<div className={element("star-sixth")}>
				<ShiningStar />
			</div>
			<div className={element("star-seventh")}>
				<ShiningStar />
			</div>
			<div className={element("star-eighth")}>
				<ShiningStar />
			</div>
			<div className={element("star-ninth")}>
				<ShiningStar />
			</div>
			<div className={element("star-tenth")}>
				<ShiningStar />
			</div>
			<div className={element("star-eleventh")}>
				<ShiningStar />
			</div>
			<div className={element("star-twelfth")}>
				<ShiningStar />
			</div>
			<div className={element("star-thirteenth")}>
				<ShiningStar />
			</div>
		</div>
	);
};
