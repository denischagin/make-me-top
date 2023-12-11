import React from 'react';

import { bem } from '@shared/utils/helpers/bem';

import { InputInterface, inputVariantEnum } from './interfaces';

import './styles.scss';

export const Input = (props: InputInterface) => {
    const {
        placeholder,
        type,
        value,
        onChange,
        fullwidth = false,
        variant = inputVariantEnum.default,
    } = props;

    const [block, element] = bem('input');

    return (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={block({
                variant,
                fullwidth,
            })}
        />
    );
};
