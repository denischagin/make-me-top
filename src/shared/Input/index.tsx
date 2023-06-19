import { bem } from '@shared/utils/bem';

import { InputInterface } from './interfaces';

import './styles.scss';

export const Input = (props: InputInterface) => {
    const {
        placeholder, type,
    } = props;

    const [block, element] = bem('input');

    return (
        <input
            type={type}
            placeholder={placeholder}
            className={block()}
        />
    );
};
