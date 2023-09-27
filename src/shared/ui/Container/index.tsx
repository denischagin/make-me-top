import React from 'react';

import { bem } from '@shared/utils/bem';

import { ContainerProps } from './interface';

import './style.scss';

export const Container = ({
    children,
    className,
}: ContainerProps) => {
    const [block] = bem('styled-container');

    return <div className={block(className)}>{children}</div>;
};
