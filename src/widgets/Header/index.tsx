import { RouterLink } from '@shared/ui/RouterLink';

import { ReactComponent as ExitIcon } from '@shared/images/exit.svg';
import { ReactComponent as Logo } from '@shared/images/logo.svg';

import { bem } from '@shared/utils/helpers/bem';

import { HEADER_LINKS, URL_LOGIN, URL_PROFILE } from '@shared/constants/links';

import { HeaderInterface, HeaderLinkInterface } from './interfaces';

import './styles.scss';
import { useLogoutMutation } from '@entities/viewer/api/api';
import { useAuth } from '@entities/viewer/hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const Header = (props: HeaderInterface) => {
    const { links = HEADER_LINKS } = props;

    const [block, element] = bem('header');

    const [logoutMutation, { isSuccess, isError }] = useLogoutMutation();
    const { refreshToken, handleLogout: logoutState } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutMutation(refreshToken!);
    };

    useEffect(() => {
        if (isSuccess || isError) {
            logoutState();
            navigate(URL_LOGIN, { replace: true });
        }
    }, [isSuccess, isError]);

    return (
        <div className={block('container-xxl')}>
            <RouterLink to={URL_PROFILE}>
                <Logo className={element('logo')} />
            </RouterLink>
            <ul className={element('links')}>
                {links.map((item) =>
                    item.link === URL_LOGIN ? (
                        <li
                            key={item.link}
                            className={element('link')}
                            onClick={handleLogout}
                        >
                            {item.text}
                            <ExitIcon className={element('icon')} />
                        </li>
                    ) : (
                        <li key={item.link} className={element('link')}>
                            <RouterLink to={item.link}>{item.text}</RouterLink>
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
};
