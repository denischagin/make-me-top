import { RouterLink } from '@shared/ui/RouterLink';

import { ReactComponent as ExitIcon } from '@shared/images/exit.svg';
import { ReactComponent as Logo } from '@shared/images/logo.svg';

import { bem } from '@shared/utils/helpers/bem';

import { HEADER_LINKS, URL_LOGIN } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';

import { HeaderInterface, HeaderLinkInterface } from './interfaces';

import './styles.scss';
import { useLogoutMutation } from '@entities/viewer/api/api';
import { useAuth } from '@entities/viewer/hooks/useAuth';
import { useAppDispatch } from '@app/providers/store/hooks';
import { logout } from '@entities/viewer/model/slice';

export const Header = (props: HeaderInterface) => {
    const { links = HEADER_LINKS } = props;

    const [block, element] = bem('header');

    const [logoutMutation] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const { refreshToken } = useAuth();

    const handleLogout = () => {
        logoutMutation(refreshToken!);
        dispatch(logout());
        
    };

    return (
        <div className={block('container-xxl')}>
            <Logo className={element('logo')} />
            <div className={element('links')}>
                {links.map((item: HeaderLinkInterface) => (
                    <span
                        className=''
                        key={item.text}
                        onClick={() =>
                            item.link === URL_LOGIN && handleLogout()
                        }
                    >
                        <RouterLink to={item.link}>
                            <span className={element('link')}>
                                {item.text}
                                {item.link === URL_LOGIN && (
                                    <ExitIcon className={element('icon')} />
                                )}
                            </span>
                        </RouterLink>
                    </span>
                ))}
            </div>
        </div>
    );
};
