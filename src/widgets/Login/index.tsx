import React, { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@shared/ui/Input';
import { PlanetButton } from '@shared/ui/PlanetButton';
import { Typography } from '@shared/ui/Typography';

import { useAppDispatch } from '@app/providers/store/hooks';

import { bem } from '@shared/utils/helpers/bem';

import { URL_PROFILE } from '@shared/constants/links';

import { LoginProps } from '@widgets/Login/interface';

import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { queryParams } from '@shared/constants';
import { useLoginMutation } from '@entities/viewer/api/api';
import { useStatus } from '@shared/utils/hooks/use-status';
import { useAuth } from '@entities/viewer';
import { inputVariantEnum } from '@shared/ui/Input/interfaces';

export const Login = ({ role }: LoginProps) => {
    const [block, element] = bem('login');
    const [inputLogin, setInputLogin] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [loginMutation, { isSuccess, data: authReponse }] =
        useLoginMutation();
    const { handleLogin } = useAuth();

    const pathByUserRole = URL_PROFILE;

    useStatus(() => {
        handleLogin(authReponse);
        const redirect = searchParams.get(queryParams.redirect);

        if (redirect !== null)
            return navigate(redirect, {
                replace: true,
            });

        return navigate(pathByUserRole, {
            replace: true,
        });
    }, isSuccess);

    const credentials = {
        login: inputLogin,
        password: inputPassword,
        role,
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
        loginMutation(credentials);
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
                variant={inputVariantEnum.rounded}
            />
            <Input
                placeholder='Пароль'
                type='password'
                onChange={handlePasswordInputChange}
                value={inputPassword}
                variant={inputVariantEnum.rounded}
            />
            <PlanetButton type='submit' title='Войти' />
        </form>
    );
};
