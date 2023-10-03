import React, { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '@shared/ui/Input';
import { PlanetButton } from '@shared/ui/PlanetButton';
import { Typography } from '@shared/ui/Typography';

import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';

import { authLogin } from '@entities/user/thunks/authLogin';

import { explorerIsExplorerSelector } from '@entities/explorer/model/selectors';

import { bem } from '@shared/utils/helpers/bem';

import { URL_DEFAULT, URL_PROFILE } from '@shared/constants/links';
import { roles, storageKeys } from '@shared/constants/storageKeys';

import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { EXPLORER_ROLE_STRING, KEEPER_ROLE_STRING } from './model';

import './styles.scss';

export const Login = () => {
    const [block, element] = bem('login');
    const [inputLogin, setInputLogin] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isExplorer = useAppSelector(explorerIsExplorerSelector);

    const pathByUserRole = URL_PROFILE;

    function callback() {
        if (!localStorage.getItem(storageKeys.tokenAuth)) {
            return navigate(URL_DEFAULT);
        }

        return navigate(pathByUserRole);
    }

    const selectedRole: roles = isExplorer
        ? EXPLORER_ROLE_STRING
        : KEEPER_ROLE_STRING;

    const payload = {
        login: inputLogin,
        password: inputPassword,
        role: selectedRole,
    };

    const handleLoginInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setInputLogin(event.target.value);
    };

    const handlePasswordInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setInputPassword(event.target.value);
    };

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        dispatch(
            authLogin({
                payload,
                callback,
            }),
        );
    };

    return (
        <form className={block()} onSubmit={handleFormSubmit}>
            <Typography
                className={element('heading')}
                variant={typographyVariant.h2}
            >
                Вход
            </Typography>
            <Input
                placeholder='Логин'
                type='text'
                onChange={handleLoginInputChange}
                value={inputLogin}
            />
            <Input
                placeholder='Пароль'
                type='password'
                onChange={handlePasswordInputChange}
                value={inputPassword}
            />
            <PlanetButton type='submit' title='Войти' />
        </form>
    );
};
