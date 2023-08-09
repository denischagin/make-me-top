import { useAppSelector } from '@app/providers/store/hooks';

import { keeperInfoSelector } from '@entities/keeper/model/selectors';

import { Avatar } from '@shared/Avatar';
import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { RouterLink } from '@shared/RouterLink';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { URL_EXPLORER } from '@shared/constants/links';

import { GradeApplicationCardInterface } from './interfaces';
import { avatarSize } from '@shared/Avatar/interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const GradeApplicationCard = (props: GradeApplicationCardInterface) => {
    const {
        finalAssesment,
        reviewRequest,
    } = props;

    const [block, element] = bem('grade-application-card');

    const userInfo = useAppSelector(keeperInfoSelector);

    const {
        studyingExplorers,
    } = userInfo;

    const reviewOrAssesment = finalAssesment || reviewRequest;
    const isExplorerObeyToKeeper = studyingExplorers.find((item) => item.personId === reviewOrAssesment?.personId);

    return (
        <div className={block()}>
            <Card
                size={cardSize.large}
                glow
            >
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Avatar size={avatarSize.medium} />
                        <div className={element('about')}>
                            <Typography
                                className={element('name')}
                                variant={typographyVariant.regular14}
                            >
                                {getUserFullName(reviewOrAssesment)}
                            </Typography>
                            <Typography
                                className={element('star-title')}
                                variant={typographyVariant.regular14}
                            >
                                {`Звезда: ${reviewOrAssesment?.courseTitle}`}
                            </Typography>
                            {
                                !finalAssesment &&
                                <Typography
                                    className={element('planet')}
                                    variant={typographyVariant.medium16}
                                >
                                    {`Планета: ${reviewRequest?.courseThemeTitle}`}
                                </Typography>
                            }
                        </div>
                    </div>
                    {
                        !isExplorerObeyToKeeper &&
                        <div className={element('button')}>
                            <RouterLink to={`${URL_EXPLORER}/${reviewOrAssesment?.personId}`}>
                                <Button
                                    title={'Оценить'}
                                    color={buttonColor.filled}
                                    size={buttonSize.large}
                                />
                            </RouterLink>
                        </div>
                    }
                </div>
            </Card>
        </div>
    );
};
