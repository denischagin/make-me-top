import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { authLogin } from '@entities/user/thunks/authLogin';

import { explorerIsExplorerSelector } from '@entities/explorer/model/selectors';

import { Input } from '@shared/Input';
import { PlanetButton } from '@shared/PlanetButton';
import { RouterLink } from '@shared/RouterLink';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import {
    URL_DEFAULT,
    URL_EXPLORER,
    URL_KEEPER,
} from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';

import { typographyVariant } from '@shared/Typography/interfaces';

import {
    EXPLORER_ROLE_STRING,
    KEEPER_ROLE_STRING,
} from './model';

import './styles.scss';

export const Login = () => {
    const [block, element] = bem('login');
    const [inputLogin, setInputLogin] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isExplorer = useAppSelector(explorerIsExplorerSelector);

    const pathByUserRole = isExplorer ? URL_EXPLORER : URL_KEEPER;

    function callback() {
        if (!localStorage.getItem(storageKeys.tokenAuth)) {
            return navigate(URL_DEFAULT);
        }

        return navigate(pathByUserRole);
    }

    const selectedRole = isExplorer ? EXPLORER_ROLE_STRING : KEEPER_ROLE_STRING;

    const payload = {
        login: inputLogin,
        password: inputPassword,
        role: selectedRole,
    };

    const handleLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLogin(event.target.value);
    };

    const handlePasswordInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword(event.target.value);
    };

    return (
        <div className={block()}>
            <Typography
                className={element('heading')}
                variant={typographyVariant.h2}
            >
                Вход
            </Typography>
            <Input
                placeholder="Логин"
                type="text"
                onChange={handleLoginInputChange}
                value={inputLogin}
            />
            <Input
                placeholder="Пароль"
                type="password"
                onChange={handlePasswordInputChange}
                value={inputPassword}
            />
            <PlanetButton
                onClick={() => {
                    dispatch(authLogin({
                        payload,
                        callback,
                    }));
                }}
                title="Войти"
            />
        </div>
    );
};
