import React,
{
    FormEventHandler,
    useState,
} from 'react';
import { useNavigate } from 'react-router';
import {
    useLocation,
    useSearchParams,
} from 'react-router-dom';
import { Input } from '@shared/ui/Input';
import { PlanetButton } from '@shared/ui/PlanetButton';
import { Typography } from '@shared/ui/Typography';

import { useAppDispatch } from '@app/providers/store/hooks';

import { authLogin } from '@entities/user/thunks/authLogin';

import { bem } from '@shared/utils/helpers/bem';

import {
    URL_LOGIN,
    URL_PROFILE,
} from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';

import { LoginProps } from '@widgets/Login/interface';

import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const Login = ({
    role,
}: LoginProps) => {
    const [block, element] = bem('login');
    const [inputLogin, setInputLogin] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const pathByUserRole = URL_PROFILE;

    function callback() {
        if (!localStorage.getItem(storageKeys.tokenAuth)) {
            return navigate(URL_LOGIN);
        }

        const redirect = searchParams.get('redirect');

        if (redirect !== null) return navigate(redirect, {
            replace: true,
        });

        return navigate(pathByUserRole, {
            replace: true,
        });
    }

    const payload = {
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

        dispatch(
            authLogin({
                payload,
                callback,
            }),
        );
    };

    return (
        <form
            className={block()}
            onSubmit={handleFormSubmit}
        >
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
            <PlanetButton
                type='submit'
                title='Войти'
            />
        </form>
    );
};
