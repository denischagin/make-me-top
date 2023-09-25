import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { userCourseInfoSelector } from "@entities/user/model/selectors";

import { ModalAlert } from "@shared/ui/ModalAlert";
import { Portal } from "@shared/ui/Portal";
import { Typography } from "@shared/ui/Typography";

import { ReactComponent as CloseIcon } from "@shared/images/close.svg";
import { ReactComponent as LockIcon } from "@shared/images/lock-big.svg";

import { bem } from "@shared/utils/bem";
import { getModalStatus } from "@shared/utils/getModalStatus";
import { getNotStudiedParentDependencies } from "@shared/utils/getNotStudiedParentDependencies";

import { ModalAccessStatus, ModalInterface } from "./interfaces";
import {
	typographyColor,
	typographyVariant,
} from "@shared/ui/Typography/interfaces";

import "./styles.scss";
import { useEffect } from "react";
import { closeModal } from "@entities/user/model/slice";

export const CircleModal = (props: ModalInterface) => {
	const {
		header,
		isLocked,
		data,
		children,
		onClose,
		isOpen,
		handleChangeSystem,
	} = props;

	const [block, element] = bem("circle-modal");

	const dispatch = useAppDispatch();

	const courseInfo = useAppSelector(userCourseInfoSelector);

	useEffect(() => {
		return () => {
			dispatch(closeModal());
		};
	}, []);

	const modalStatus = data
		? getModalStatus({
				lastChosenSystem: data.lastChosenSystem,
				userProgress: data.userProgress,
				courseInfo,
		  })
		: ModalAccessStatus.opened;
	const notStudiedParentDependencies = data
		? getNotStudiedParentDependencies({
				lastChosenSystem: data.lastChosenSystem,
				userProgress: data.userProgress,
		  })
		: [];

	const lockIcon = isLocked && <LockIcon className={element("lock-icon")} />;

	return (
		<Portal target={document.body}>
			<div
				className={block({
					open: isOpen,
					close: !isOpen,
				})}
			>
				<div className={element("background")} onClick={onClose} />
				<div className={element("container")}>
					<div className={element("content")}>
						<div className={element("header")}>
							<Typography
								variant={typographyVariant.h2}
								color={typographyColor.black}
								className={element("name")}
							>
								{lockIcon}
								{header}
							</Typography>
							<CloseIcon className={element("close-icon")} onClick={onClose} />
						</div>

						{modalStatus !== ModalAccessStatus.opened && (
							<ModalAlert
								title={modalStatus}
								dependencies={notStudiedParentDependencies}
								handleChangeSystem={handleChangeSystem}
							/>
						)}

						<div className={element("item-list")}>{children}</div>
					</div>
				</div>
			</div>
		</Portal>
	);
};
