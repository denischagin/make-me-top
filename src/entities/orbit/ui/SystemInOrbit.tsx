import React, {
	CSSProperties,
	MouseEventHandler,
	memo,
	useEffect,
	useMemo,
	useState,
} from "react";

import { getDigitalAngle } from "@entities/orbit/lib/getDigitalAngle";
import { getPercentageProgress } from "@entities/orbit/lib/getPercentageProgress";
import { getRadius } from "@entities/orbit/lib/getRadius";
import { getSystemChildData } from "@entities/orbit/lib/getSystemChildData";
import { getSystemColorByProgressType } from "@entities/orbit/lib/getSystemColorByProgressType";
import { getSystemParentData } from "@entities/orbit/lib/getSystemParentData";
import { getSystemProgressType } from "@entities/orbit/lib/getSystemProgressType";
import { getXCoordinateOnEllipse } from "@entities/orbit/lib/getXCoordinateOnEllipse";
import { getYCoordinateOnEllipse } from "@entities/orbit/lib/getYCoordinateOnEllipse";
import System from "@shared/ui/System";

import { ReactComponent as LockIcon } from "@shared/images/lock.svg";

import { bem } from "@shared/utils/bem";

import "./styles.scss";
import { SystemType, UserProgressInGalaxy } from "@entities/galaxy/model/types";
import { SystemProgressTypes } from "@shared/types/common";
import { roles, storageKeys } from "@shared/constants/storageKeys";

interface SystemInOrbitProps {
	system: SystemType;
	handleSystemClick: MouseEventHandler<HTMLDivElement>;
	handleSystemMouseEnter: MouseEventHandler<HTMLDivElement>;
	handleSystemMouseLeave: MouseEventHandler<HTMLDivElement>;
	orbitHalfWidth: number;
	orbitHalfHeight: number;
	elementWidth: number;
	elementHeight: number;
	userProgress: UserProgressInGalaxy;
	systemStyle?: CSSProperties;
}

const SystemInOrbit = (props: SystemInOrbitProps) => {
	console.log('render system in orbit');

	const {
		system,
		handleSystemClick,
		handleSystemMouseEnter,
		handleSystemMouseLeave,
		orbitHalfWidth,
		orbitHalfHeight,
		elementWidth,
		elementHeight,
		userProgress,
		systemStyle,
	} = props;

	const isNoExplorer = useMemo(() => {
		return (
			(localStorage.getItem(storageKeys.currentRole) as roles) !== "EXPLORER"
		);
	}, []);

	const [destroyCount, setDestoryCount] = useState(0);
	const [randomDestroyClass, setRandomDestroyClass] = useState<string>();

	const destoryClasses = [
		"destroy1",
		"destroy2",
		"destroy3",
		"destroy4",
		"destroy5",
		"destroy6",
	];
	const isDestroy = destroyCount >= 3;

	useEffect(() => {
		const randomClass = isDestroy
			? destoryClasses[Math.floor(Math.random() * destoryClasses.length)]
			: undefined;

		setRandomDestroyClass(randomClass);
	}, [isDestroy]);

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

	const handleGalaxyClick: MouseEventHandler<HTMLDivElement> = (e) => {
		handleSystemClick(e);
		isNoExplorer && setDestoryCount((prev) => prev + 1);
	};

	const [block, element] = bem("orbit");

	const children = useMemo(
		() => (
			<>
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
			</>
		),
		[systemProgressType, system.systemName, systemPercentageProgress]
	);

	return (
		<div
			key={system.systemId}
			className={element("content-system", randomDestroyClass)}
			onClick={handleGalaxyClick}
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
			<System percentageProgress={systemPercentageProgress} color={systemColor}>
				{children}
			</System>
		</div>
	);
};

export default memo(SystemInOrbit);
