import { Card } from '@shared/ui/Card';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { InfoCardInterface } from './interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const InfoCard = (props: InfoCardInterface) => {
    const { title, value } = props;

    const [block, element] = bem('info-сard');

    return (
        <div className={block()}>
            <Card size={cardSize.small}>
                <Typography
                    variant={typographyVariant.regular16}
                    className={element('heading')}
                >
                    {title}
                </Typography>
                <div className={element('value')}>{value}</div>
            </Card>
        </div>
    );
};
