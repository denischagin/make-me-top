import React, { memo, useState } from "react";

import { SystemType, UserProgressInGalaxy } from "@entities/galaxy/model/types";

import { getDigitalAngle } from "@entities/orbit/lib/getDigitalAngle";
import { getPercentageProgress } from "@entities/orbit/lib/getPercentageProgress";
import { getRadius } from "@entities/orbit/lib/getRadius";
import { getSystemChildData } from "@entities/orbit/lib/getSystemChildData";
import { getSystemColorByProgressType } from "@entities/orbit/lib/getSystemColorByProgressType";
import { getSystemParentData } from "@entities/orbit/lib/getSystemParentData";
import { getSystemProgressType } from "@entities/orbit/lib/getSystemProgressType";
import { getXCoordinateOnEllipse } from "@entities/orbit/lib/getXCoordinateOnEllipse";
import { getYCoordinateOnEllipse } from "@entities/orbit/lib/getYCoordinateOnEllipse";

import System from "@shared/System";

import { ReactComponent as LockIcon } from "@shared/images/lock.svg";

import { bem } from "@shared/utils/bem";
import { elementToNumber } from "@shared/utils/elementToNumber";

import { SystemProgressTypes } from "@shared/types/common";

import "./styles.scss";

interface IOrbitProps {
	userProgress: UserProgressInGalaxy;
	systemList: Array<SystemType>;
	orbitWidth: number;
	orbitHeight: number;
	systemStyle?: React.CSSProperties;
	handleSystemClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	handleSystemMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
	handleSystemMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Orbit: React.FC<IOrbitProps> = (props) => {
	const {
		userProgress,
		systemList,
		orbitWidth,
		orbitHeight,
		systemStyle,
		handleSystemClick,
		handleSystemMouseEnter,
		handleSystemMouseLeave,
	} = props;

	const [active, setActive] = useState(false);

	const [block, element] = bem("orbit");

	const orbitHalfWidth = orbitWidth / 2;
	const orbitHalfHeight = orbitHeight / 2;

	const elementWidth = elementToNumber({
		element: systemStyle?.width,
	});

	const elementHeight = elementToNumber({
		element: systemStyle?.height,
	});

	return (
		<div
			className={block({
				active,
			})}
			onAnimationEnd={() => !active && setActive(true)}
		>
			<div
				className={element("content")}
				style={{
					width: orbitWidth + "px",
					height: orbitHeight + "px",
				}}
			>
				{systemList.map((system) => {
					const systemProgressType = getSystemProgressType({
						system,
						userProgress,
					});

					const systemColor = getSystemColorByProgressType({
						systemProgressType,
					});

					const systemPercentageProgress = getPercentageProgress({
						system,
						userProgress,
					});

					const digitalAngle = getDigitalAngle(system.systemPosition);

					const radius = getRadius({
						digitalAngle,
						halfWidth: orbitHalfWidth,
						halfHeight: orbitHalfHeight,
					});

					const x = getXCoordinateOnEllipse({
						ellipseHalfWidth: orbitHalfWidth,
						radius,
						digitalAngle,
						elementWidth,
					});

					const y = getYCoordinateOnEllipse({
						ellipseHalfHeight: orbitHalfHeight,
						radius,
						digitalAngle,
						elementHeight,
					});

					return (
						<div
							key={system.systemId}
							className={element("content-system")}
							onClick={handleSystemClick}
							onMouseEnter={handleSystemMouseEnter}
							onMouseLeave={handleSystemMouseLeave}
							style={{
								...systemStyle,
								left: x + "px",
								top: y + "px",
							}}
							data-system-id={system.systemId}
							data-system-parent-list={getSystemParentData(system)}
							data-system-children-list={getSystemChildData(system)}
							data-system-progress-type={systemProgressType}
						>
							<System
								percentageProgress={systemPercentageProgress}
								color={systemColor}
							>
								{systemProgressType === SystemProgressTypes.SYSTEM_CLOSE && (
									<LockIcon />
								)}
								<p
									className={element(
										"content-system--name",
										systemPercentageProgress > 64 ? "white" : undefined
									)}
								>
									{system.systemName}
								</p>
							</System>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default memo(Orbit);
