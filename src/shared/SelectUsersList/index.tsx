import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { useAppDispatch } from "@app/providers/store/hooks";

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

export const SelectUsersList = (props: UserListInterface) => {
	const { keepersList, courseId } = props;

	const dispatch = useAppDispatch();

	const [block, element] = bem("select-list");
	const [selectedUsers, setSelectedUsers] = useState<CourseKeeper[]>([]);

	function removeUser(userId: number) {
		setSelectedUsers(selectedUsers.filter((user) => user.personId !== userId));
	}

	const navigate = useNavigate();

	const handleUnSelectAll = () => {
		if (keepersList) setSelectedUsers([]);
	};

	const handleSelectAll = () => {
		if (keepersList) setSelectedUsers(keepersList);
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
				<div
					key={user.personId}
					className={element("item", {
						selected: selectedUsers.some(
							(selectedUser) => selectedUser.personId === user.personId
						),
					})}
				>
					<div className={element("user")}>
						<Avatar size={avatarSize.small} />
						<span className={element("name")}>{getUserFullName(user)}</span>
					</div>
					<div className={element("info")}>
						<div
							className={element("button", {
								visible: selectedUsers.some(
									(selectedUser) => selectedUser.personId === user.personId
								),
							})}
						>
							{!selectedUsers.some(
								(selectedUser) => selectedUser.personId === user.personId
							) ? (
								<Button
									size={buttonSize.small}
									color={buttonColor.filled}
									onClick={() => setSelectedUsers([...selectedUsers, user])}
									title="Выбрать хранителя"
								/>
							) : (
								<Button
									size={buttonSize.small}
									color={buttonColor.primary500}
									onClick={() => removeUser(user.personId)}
									title="Отменить выбор"
								/>
							)}
						</div>
						<div
							className={element("rating", {
								hide: selectedUsers.some(
									(selectedUser) => selectedUser.personId === user.personId
								),
							})}
						>
							<Rating
								systemColor={ratingSystemColor.primary500}
								size={ratingSize.medium}
								scoreColor={ratingScoreColor.black}
								rating={user.rating}
							/>
						</div>
					</div>
				</div>
			))}
			{!!keepersList?.length && (
				<div className={element("submit-selected")}>
					<Button
						size={buttonSize.large}
						color={buttonColor.primary500}
						onClick={() => {
							if (selectedUsers.length > 0) {
								dispatch(
									postCourseRequest({
										payload: {
											courseId: courseId!,
											keepers: selectedUsers.map((user) => user.keeperId),
										},
									})
								);
								return
							}
                            return toast.error(TOAST_ERROR_CHOOSE_KEEPER);
						}}
						title="Отправить заявку"
					/>
				</div>
			)}
		</div>
	);
};
