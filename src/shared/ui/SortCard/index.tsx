import React from 'react';
import { Card } from '@shared/ui/Card';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { SortCardProps } from './interface';

import './style.scss';

export const SortCard = ({
    title,
    value,
}: SortCardProps) => {
    const [block] = bem('sort-card');

    return (
        <div className={block()}>
            <Card size={cardSize.medium}>
                <Typography variant={typographyVariant.regular16}>
                    {title}
                </Typography>

                <Typography variant={typographyVariant.medium16}>
                    {value}
                </Typography>
            </Card>
        </div>
    );
};
