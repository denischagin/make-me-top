import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { CourseKeeper } from "@entities/user/model/types";
import { postCourseRequest } from "@entities/user/thunks/postCourseRequest";

import { Avatar } from "@shared/Avatar";
import { Button } from "@shared/Button";
import { Rating } from "@shared/Rating";

import { bem } from "@shared/utils/bem";
import { getUserFullName } from "@shared/utils/getUserFullName";
import { sortByRating } from "@shared/utils/sortByRating";

import { URL_EXPLORER, URL_PROFILE } from "@shared/constants/links";
import { TOAST_ERROR_CHOOSE_KEEPER } from "@shared/constants/toastTitles";

import { avatarSize } from "@shared/Avatar/interfaces";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
import {
	ratingScoreColor,
	ratingSize,
	ratingSystemColor,
} from "@shared/Rating/interfaces";

import { UserListInterface } from "@shared/types/common";

import "./styles.scss";
import { DividingLine } from "@shared/DividingLine";
import { DividingLineColor } from "@shared/DividingLine/interfaces";
import {
	userIsErrorSelector,
	userIsSuccessSelector,
} from "@entities/user/model/selectors";
import { showModal } from "@entities/user/model/slice";
import { SelectUsersKeepersItem } from "@shared/SelectUsersKeepersItem";

export const SelectUsersList = (props: UserListInterface) => {
	const { keepersList, courseId } = props;

	const dispatch = useAppDispatch();

	const [block, element] = bem("select-list");
	const [selectedUsers, setSelectedUsers] = useState<CourseKeeper[]>([]);
	const isError = useAppSelector(userIsErrorSelector);
	const isSuccess = useAppSelector(userIsSuccessSelector);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isSuccess) return;

		dispatch(showModal());
		navigate(URL_PROFILE);
	}, [isSuccess]);

	const handleUnSelectAll = () => {
		if (keepersList) setSelectedUsers([]);
	};

	const handleSelectAll = () => {
		if (keepersList) setSelectedUsers(keepersList);
	};

	function handleRemoveUser(userId: number) {
		setSelectedUsers(selectedUsers.filter((user) => user.personId !== userId));
	}

	const handleSendApplication = () => {
		if (selectedUsers.length === 0)
			return toast.error(TOAST_ERROR_CHOOSE_KEEPER);

		const keepers = selectedUsers.map((user) => user.keeperId);

		dispatch(
			postCourseRequest({
				payload: {
					courseId: courseId!,
					keepers,
				},
			})
		);
	};

	const isSelectedAll = selectedUsers.length === keepersList?.length;

	return (
		<div className={block()}>
			<div className={element("button-select")}>
				{keepersList?.length !== 0 && (
					<Button
						size={buttonSize.small}
						color={isSelectedAll ? buttonColor.primary500 : buttonColor.filled}
						onClick={isSelectedAll ? handleUnSelectAll : handleSelectAll}
						title={isSelectedAll ? "Сбросить выбор" : "Выбрать всех"}
					/>
				)}
			</div>

			{sortByRating(keepersList)?.map((user) => (
				<SelectUsersKeepersItem
					key={user.personId}
					user={user}
					selected={selectedUsers.some(
						(selectedUser) => selectedUser.personId === user.personId
					)}
					onRemoveUser={handleRemoveUser}
					onSelectUser={(user) => setSelectedUsers([...selectedUsers, user])}
				/>
			))}

			{!!keepersList?.length && (
				<div className={element("submit-selected")}>
					<Button
						size={buttonSize.large}
						color={buttonColor.primary500}
						onClick={handleSendApplication}
						title="Отправить заявку"
					/>
				</div>
			)}
		</div>
	);
};
