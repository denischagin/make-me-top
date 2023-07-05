import { RouterLink } from '@shared/RouterLink';

import { ReactComponent as ExitIcon } from '@shared/images/exit.svg';
import { ReactComponent as Logo } from '@shared/images/logo.svg';

import { bem } from '@shared/utils/bem';

import {
    HEADER_LINKS,
    URL_DEFAULT,
} from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';

import {
    HeaderInterface,
    HeaderLinkInterface,
} from './interfaces';

import './styles.scss';

export const Header = (props: HeaderInterface) => {
    const {
        links = HEADER_LINKS,
    } = props;

    const [block, element] = bem('header');

    return (
        <div className={block('container-xxl')}>
            <Logo className={element('logo')} />
            <div className={element('links')}>
                {links.map((item: HeaderLinkInterface) => (
                    <span
                        className=""
                        key={item.text}
                        onClick={() => {
                            (item.link === URL_DEFAULT) && localStorage.removeItem(storageKeys.tokenAuth);
                        }}
                    >
                        <RouterLink to={item.link}>
                            <span className={element('link')}>
                                {item.text}
                                {item.link === URL_DEFAULT && <ExitIcon className={element('icon')} />}
                            </span>
                        </RouterLink>
                    </span>
                ))}
            </div>
        </div>
    );
};
