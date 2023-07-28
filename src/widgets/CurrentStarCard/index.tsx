import { TabPanel } from 'react-tabs';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import {
    userExplorersListSelector,
    userInfoSelector,
    userIsModalOpenSelector,
    userKeepersListSelector,
} from '@entities/user/model/selectors';
import { showModal } from '@entities/user/model/slice';
import { getModalPlanets } from '@entities/user/thunks/getModalPlanets';

import { explorerInfoSelector } from '@entities/explorer/model/selectors';

import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { CircleModal } from '@shared/CircleModal';
import { CurrentUserItem } from '@shared/CurrentUserItem';
import { DividingLine } from '@shared/DividingLine';
import { FinalGrade } from '@shared/FinalGrade';
import { MmtTabs } from '@shared/MmtTabs';
import { PlanetList } from '@shared/PlanetList';
import { Typography } from '@shared/Typography';
import { UsersList } from '@shared/UsersList';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { ProgressBar } from '@widgets/ProgressBar';

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

const CURRENT_PLANET = 'SQL';

export const CurrentStarCard = (props: CurrentStarCardInterface) => {
    const {
        tabsList = [],
    } = props;

    const [block, element] = bem('current-star-card');

    const dispatch = useAppDispatch();
    const explorersList = useAppSelector(userExplorersListSelector);
    const keepersList = useAppSelector(userKeepersListSelector);
    const isModalOpen = useAppSelector(userIsModalOpenSelector);
    const userInfo = useAppSelector(explorerInfoSelector);

    const {
        currentSystem: {
            keeper,
            courseThemeTitle,
            courseId,
            courseTitle,
            progress,
        },
    } = userInfo;

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
                            <PlanetList currentPlanet={CURRENT_PLANET} />
                            <FinalGrade />
                        </TabPanel>
                        <TabPanel>
                            <CurrentUserItem
                                user={userInfo}
                                badgeTitle="Мой рейтинг"
                            />
                            <DividingLine color={DividingLineColor.gray500} />
                            <UsersList list={explorersList} />
                        </TabPanel>
                        <TabPanel>
                            <CurrentUserItem
                                user={userInfo}
                                badgeTitle="Мой хранитель"
                            />
                            <DividingLine color={DividingLineColor.gray500} />
                            <UsersList list={keepersList} />
                        </TabPanel>
                    </MmtTabs>
                </CircleModal>
            }
            <Card
                size={cardSize.large}
                glow
            >
                <Typography
                    variant={typographyVariant.h2}
                    className={element('heading')}
                >
                    {`Планета: ${courseId}. ${courseTitle}`}
                </Typography>
                <Typography
                    variant={typographyVariant.regular14}
                    className={element('current-star')}
                >
                    {`Звезда: ${courseThemeTitle}`}
                </Typography>
                <Typography
                    variant={typographyVariant.regular14}
                    className={element('current-curator', 'mb-4')}
                >
                    {`Преподаватель: ${getUserFullName(keeper)}`}
                </Typography>
                <span className={element('progress')}>
                    <Typography
                        variant={typographyVariant.medium16}
                        color={typographyColor.primary500}
                    >
                        {`Освоено ${progress}%`}
                    </Typography>
                    <ProgressBar progress={progress} />
                </span>
                <div className={element('buttons')}>
                    <Button
                        size={buttonSize.large}
                        title="Отменить"
                    />
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.filled}
                        title="Продолжить"
                        onClick={() => {
                            dispatch(getModalPlanets({
                                planetId: courseId,
                            }));
                            dispatch(showModal());
                        }}
                    />
                </div>
            </Card>
        </div>
    );
};
