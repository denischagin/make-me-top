import React from 'react';

import { bem } from '@shared/utils/bem';

import { InputInterface } from './interfaces';

import './styles.scss';

export const Input = (props: InputInterface) => {
    const {
        placeholder,
        type,
        value,
        setStateOnChange,
    } = props;

    const [block, element] = bem('input');

    function handleOnInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (setStateOnChange) {
            return setStateOnChange(event.target.value);
        }

        return;
    }

    return (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={handleOnInputChange}
            className={block()}
        />
    );
};
