import SystemProgress from "@shared/ui/SystemProgress";

import { ReactComponent as OrbitIcon } from "@shared/images/orbit.svg";

import { bem } from "@shared/utils/bem";

import { SystemInterface } from "./interfaces";

import "./styles.scss";
import { memo } from "react";

const System = (props: SystemInterface) => {
	const { color, children, percentageProgress } = props;

	const [block, element] = bem("system");

	return (
		<div
			className={block({
				color,
			})}
		>
			<div
				className={element("info", {
					color,
				})}
			>
				<SystemProgress percentageProgress={percentageProgress} />
				{children}
				<div className={element("orbit")}>
					<OrbitIcon
						width="auto"
						height="auto"
						className={element("orbit-icon", {
							color,
						})}
					/>
				</div>
			</div>
		</div>
	);
};

export default memo(System);
