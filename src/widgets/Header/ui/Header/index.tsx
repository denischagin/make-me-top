import { RouterLink } from '@shared/ui/RouterLink';

import { ReactComponent as ExitIcon } from '@shared/images/exit.svg';
import { ReactComponent as Logo } from '@shared/images/logo.svg';

import { bem } from '@shared/utils/helpers/bem';

import { HEADER_LINKS, URL_LOGIN, URL_PROFILE } from '@shared/constants/links';

import { HeaderInterface } from './interfaces';

import './styles.scss';
import { useLogoutMutation } from '@entities/viewer/api/api';
import { useAuth } from '@entities/viewer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DrawerMenu } from '@widgets/Header/ui/DrawerMenu';
import { Button } from '@shared/ui/Button';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { ConfirmModal } from '@shared/ui/ConfirmModal';

export const Header = (props: HeaderInterface) => {
    const { links = HEADER_LINKS } = props;

    const [block, element] = bem('header');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isOpenModalConfirm, setisOpenModalConfirm] = useState(false);

    const [logoutMutation, { isSuccess, isError }] = useLogoutMutation();
    const { refreshToken, handleLogout: logoutState } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => logoutMutation(refreshToken!);
    const handleCloseDrawer = () => setIsOpenDrawer(false);
    const handleOpenDrawer = () => setIsOpenDrawer(true);
    const handleOpenConfirmModal = () => setisOpenModalConfirm(true);
    const handleCloseConfirmModal = () => setisOpenModalConfirm(false);

    useEffect(() => {
        if (isSuccess || isError) {
            logoutState();
            navigate(URL_LOGIN, { replace: true });
        }
    }, [isSuccess, isError]);

    return (
        <>
            <ConfirmModal
                isOpen={isOpenModalConfirm}
                confitmTitle='Вы уверены, что хотите выйти?'
                rejectButtonTitle={'Нет, я хочу остаться!'}
                submitButtonTitle={'Да, я хочу выйти'}
                onSubmit={handleLogout}
                onClose={handleCloseConfirmModal}
            />

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
                                onClick={handleOpenConfirmModal}
                            >
                                {item.text}
                                <ExitIcon className={element('icon')} />
                            </li>
                        ) : (
                            <li
                                key={item.link}
                                className={element('link', {
                                    active: location.pathname === item.link,
                                })}
                            >
                                <RouterLink to={item.link}>
                                    {item.text}
                                </RouterLink>
                            </li>
                        ),
                    )}
                </ul>

                <Button
                    title='Меню'
                    size={buttonSize.large}
                    onClick={handleOpenDrawer}
                    className={element('burger-menu-button')}
                />

                <DrawerMenu
                    isOpen={isOpenDrawer}
                    onClose={handleCloseDrawer}
                    onSignOut={handleOpenConfirmModal}
                />
            </div>
        </>
    );
};
