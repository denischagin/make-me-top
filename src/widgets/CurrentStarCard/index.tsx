
import { useState } from 'react';
import toast from 'react-hot-toast';
import { TabPanel } from 'react-tabs';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import {
    userCourseInfoSelector,
    userIsModalOpenSelector,
} from '@entities/user/model/selectors';
import { showModal } from '@entities/user/model/slice';
import { getCourseInfo } from '@entities/user/thunks/getCourseInfo';
import { getModalPlanets } from '@entities/user/thunks/getModalPlanets';

import {
    explorerInfoSelector,
    explorerIsSystemActiveSelector,
} from '@entities/explorer/model/selectors';
import { declineCurrentSystem } from '@entities/explorer/model/slice';
import { leaveCourseRequest } from '@entities/explorer/thunks/leaveCourseRequest';

import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { CircleModal } from '@shared/CircleModal';
import { ConfirmModal } from '@shared/ConfirmModal';
import { CurrentUserItem } from '@shared/CurrentUserItem';
import { DividingLine } from '@shared/DividingLine';
import { FinalGrade } from '@shared/FinalGrade';
import { MmtTabs } from '@shared/MmtTabs';
import { PlanetList } from '@shared/PlanetList';
import { Typography } from '@shared/Typography';
import { UsersList } from '@shared/UsersList';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { CONFIRM_CANCEL_LEARNING } from '@shared/constants/modalTitles';

import { ProgressBar } from '@widgets/ProgressBar';
import { SelectStar } from '@widgets/SelectStar';

import { CurrentStarCardInterface } from './interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import { DividingLineColor } from '@shared/DividingLine/interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/Typography/interfaces';

import './styles.scss';

export const CurrentStarCard = (props: CurrentStarCardInterface) => {
    const {
        tabsList = [],
    } = props;

    const [block, element] = bem('current-star-card');
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector(userIsModalOpenSelector);
    const courseInfo = useAppSelector(userCourseInfoSelector);
    const systemState = useAppSelector(explorerIsSystemActiveSelector);
    const userInfo = useAppSelector(explorerInfoSelector);

    const TOAST_SUCCES_REJECTED = 'Заявка на обучение отклонена';

    const {
        studyRequest,
        currentSystem,
    } = userInfo;

    const {
        course,
        you,
        yourKeeper,
        explorers,
        keepers,
    } = courseInfo;

    if ((!currentSystem && !studyRequest) || !systemState) {
        return <SelectStar />;
    }

    if (studyRequest) {
        return null;
    }

    return (
        <div className={block()}>
            {
                isModalOpen &&
                <CircleModal
                    header="Groovy"
                    onClose={() => dispatch(showModal())}
                >
                    <MmtTabs list={tabsList}>
                        <TabPanel>
                            <PlanetList currentPlanet={course.title} />
                            <FinalGrade />
                        </TabPanel>
                        <TabPanel>
                            <CurrentUserItem
                                explorer={you}
                                badgeTitle="Мой рейтинг"
                            />
                            <DividingLine color={DividingLineColor.gray500} />
                            <UsersList explorersList={explorers} />
                        </TabPanel>
                        <TabPanel>
                            <CurrentUserItem
                                keeper={yourKeeper}
                                badgeTitle="Мой хранитель"
                            />
                            <DividingLine color={DividingLineColor.gray500} />
                            <UsersList keepersList={keepers} />
                        </TabPanel>
                    </MmtTabs>
                </CircleModal>
            }
            {
                isAcceptModalOpen &&
                <ConfirmModal
                    confitmTitle={CONFIRM_CANCEL_LEARNING}
                    confirmButtonTitle='Нет, хочу продолжить'
                    declineButtonTitle='Да, я уверен'
                    onClose={() => setIsAcceptModalOpen(false)}
                />
            }
            <Typography
                className={element('current-star-heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Текущая звезда
            </Typography>
            <Card
                size={cardSize.large}
                glow
            >
                <Typography
                    variant={typographyVariant.h2}
                    className={element('heading')}
                >
                    {`Планета: ${currentSystem?.courseId}. ${currentSystem?.courseTitle}`}
                </Typography>
                <Typography
                    variant={typographyVariant.regular14}
                    className={element('current-star')}
                >
                    {`Звезда: ${currentSystem?.courseThemeTitle}`}
                </Typography>
                <Typography
                    variant={typographyVariant.regular14}
                    className={element('current-keeper', 'mb-4')}
                >
                    {`Преподаватель: ${getUserFullName(currentSystem?.keeper)}`}
                </Typography>
                <span className={element('progress')}>
                    <Typography
                        variant={typographyVariant.medium16}
                        color={typographyColor.primary500}
                    >
                        {`Освоено ${currentSystem?.progress}%`}
                    </Typography>
                    <ProgressBar progress={currentSystem?.progress} />
                </span>
                <div className={element('buttons')}>
                    <Button
                        size={buttonSize.large}
                        title="Отменить"
                        onClick={() => {
                            dispatch(declineCurrentSystem());
                            dispatch(leaveCourseRequest({
                                payload: {
                                    courseId: currentSystem?.courseId,
                                },
                            }));
                            setIsAcceptModalOpen(true);
                            toast(TOAST_SUCCES_REJECTED, {
                                icon: '😔',
                            });
                        }}
                    />
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.filled}
                        title="Продолжить"
                        onClick={() => {
                            dispatch(getModalPlanets({
                                planetId: currentSystem?.courseId,
                            }));
                            dispatch(getCourseInfo({
                                courseId: currentSystem?.courseId,
                            }));
                            dispatch(showModal());
                        }}
                    />
                </div>
            </Card>
        </div >
    );
};
