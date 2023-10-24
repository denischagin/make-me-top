import React, { useState } from 'react';
import { Card } from '@shared/ui/Card';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { SortCardProps } from './interface';

import './style.scss';
import { CustomSelect } from '@shared/ui/CustomSelect';

export const SortCard = ({
    title,
    options = [
        { value: 'default', label: 'С 1 до конца' },
        { value: 'default', label: 'С 2 до конца' },
        { value: 'default', label: 'С 3 до конца' },
        { value: 'default', label: 'С 4 до конца' },
    ],
}: SortCardProps) => {
    const [block] = bem('sort-card');

    return (
        <div className={block()}>
            <Card size={cardSize.medium}>
                <Typography variant={typographyVariant.regular16}>
                    {title}
                </Typography>

                <CustomSelect options={options} defaultValue={options[0]} />
            </Card>
        </div>
    );
};
