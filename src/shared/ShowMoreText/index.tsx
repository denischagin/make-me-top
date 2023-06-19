import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { ShowMoreTextInterface } from './interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const ShowMoreText = (props: ShowMoreTextInterface) => {
    const {
        onClick,
    } = props;

    const [block, element] = bem('show-more-text');

    return (
        <div className={block()}>
            <Typography
                className={element('expand')}
                onClick={onClick}
                variant={typographyVariant.regular14}
            >
                Прочитать полностью
            </Typography>
        </div>
    );
};
