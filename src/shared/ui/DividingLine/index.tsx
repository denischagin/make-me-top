import { bem } from '@shared/utils/helpers/bem';

import { DividingLineInterface } from './interfaces';

import './styles.scss';

export const DividingLine = (props: DividingLineInterface) => {
    const {
        color,
    } = props;

    const [block, element] = bem('dividing-line');

    return (
        <hr
            className={block({
                color,
            })}
        />
    );
};
