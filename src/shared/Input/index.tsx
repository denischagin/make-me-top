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

    return (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={(event) => setStateOnChange(event.target.value)}
            className={block()}
        />
    );
};
