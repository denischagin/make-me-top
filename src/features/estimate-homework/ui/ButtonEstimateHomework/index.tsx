import { Button } from "@shared/ui/Button";
import { ConfirmModal } from "@shared/ui/ConfirmModal";
import { useState } from "react";
import { ButtonEstimateHomeworkProps } from "./interface";

export const ButtonEstimateHomework = (props: ButtonEstimateHomeworkProps) => {
	const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

	const handleOpenConfirmEstimate = () => setIsOpenConfirmModal(true);
	const handleCloseConfirmEstimate = () => setIsOpenConfirmModal(false);

	return (
		<>
			<Button {...props} onClick={handleOpenConfirmEstimate} />

			<ConfirmModal
				isOpen={isOpenConfirmModal}
				confirmTitle={"Вы уверены, чтобы хотите оценить это задание?"}
				rejectButtonTitle={"Нет, не хочу"}
				submitButtonTitle={"Да, хочу оценить"}
				onSubmit={() => {}}
				onClose={handleCloseConfirmEstimate}
			/>
		</>
	);
};
