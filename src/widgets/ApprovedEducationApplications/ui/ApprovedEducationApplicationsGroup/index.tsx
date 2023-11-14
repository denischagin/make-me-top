import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { bem } from '@shared/utils/helpers/bem';
import { MouseEvent, MouseEventHandler, useState } from 'react';
import { ApprovedEducationApplicationsGroupProps } from './interface';
import './styles.scss';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { RequestRatingCard } from '@entities/user/ui/RequestRatingCard';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import {
	ApprovedEducationApplicationsGroupSummary
} from '@widgets/ApprovedEducationApplications/ui/ApprovedEducationApplicationsGroupSummary';
import { useStartEducationOnCourseMutation } from '@entities/course';
import { useStatus } from '@shared/utils/hooks/use-status';
import toast from 'react-hot-toast';


export const ApprovedEducationApplicationsGroup = ({
	course
}: ApprovedEducationApplicationsGroupProps) => {
	const [block, element] = bem('approved-education-application-group');
	const [active, setActive] = useState(false);
	const [isOpenConfirm, setIsOpenConfirm] = useState(false);
	const { data: userInfo } = useGetKeeperProfileQuery();
	const [startEducation, {
		isSuccess: isSuccessStartEducation, isError: isErrorStartEducation
	}] = useStartEducationOnCourseMutation();
	
	const handleClickStartEducation: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation();
		setIsOpenConfirm(true);
	};
	
	const handleSubmitStartEducation = () => {
		startEducation(course.courseId);
	};
	
	useStatus(() => {
		toast('Обучение успешно началось');
		setIsOpenConfirm(false);
	}, isSuccessStartEducation);
	
	useStatus(() => {
		setIsOpenConfirm(false);
	}, isErrorStartEducation);
	const handleCloseConfirm = () => setIsOpenConfirm(false);
	
	const explorersToEducation =
		course.requests.slice(0, userInfo?.person.maxExplorers).map((request) =>
			getUserFullName(request));
	
	return (
		<>
			<ConfirmModal
				confirmTitle="Вы уверены, что хотите начать обучение?"
				confirmDescription={`На обучение попадут: ${explorersToEducation}`}
				rejectButtonTitle="Нет, хочу еще подумать"
				submitButtonTitle="Да, конечно хочу!"
				onSubmit={handleSubmitStartEducation}
				onClose={handleCloseConfirm}
				isOpen={isOpenConfirm}
			/>
			
			<div className={block()}>
				<CardGroupDetails
					active={active}
					setActive={setActive}
					summary={
						<ApprovedEducationApplicationsGroupSummary
							courseTitle={course.courseTitle}
							courseRequestsCount={course.requests.length}
							onStartEducation={handleClickStartEducation}
							active={active}
						/>
					}
					content={
						course.requests.map((request, index) => (
							<RequestRatingCard {...request} />
						))
					}
				/>
			</div>
		
		</>
	);
};