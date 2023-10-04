import React from 'react';

import { bem } from '@shared/utils/helpers/bem';

import { InputInterface } from './interfaces';

import './styles.scss';

export const Input = (props: InputInterface) => {
    const {
        placeholder,
        type,
        value,
        onChange,
    } = props;

    const [block, element] = bem('input');

    return (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={block()}
        />
    );
};
