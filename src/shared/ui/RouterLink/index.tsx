import { Link } from 'react-router-dom';

import { bem } from '@shared/utils/helpers/bem';

import { LinkInterface } from './interfaces';

import './styles.scss';

export const RouterLink = (props: LinkInterface) => {
    const { to, children } = props;

    const [block, element] = bem('link');

    return (
        <Link to={to} className={block()}>
            {children}
        </Link>
    );
};
