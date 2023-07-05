import {
    useEffect,
    useState,
} from 'react';
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
    URL_CURATOR,
    URL_DEFAULT,
    URL_EXPLORER,
} from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';

import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const Login = () => {
    const [block, element] = bem('login');
    const [inputLogin, setInputLogin] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isExplorer = useAppSelector(explorerIsExplorerSelector);

    const pathByUserRole = isExplorer ? URL_EXPLORER : URL_CURATOR;

    function callback() {
        if (!localStorage.getItem(storageKeys.tokenAuth)) {
            return navigate(URL_DEFAULT);
        }

        return navigate(pathByUserRole);
    }

    const payload = {
        login: inputLogin,
        password: inputPassword,
    };

    return (
        <>
            <div className={block()}>
                <Typography
                    className={element('heading')}
                    variant={typographyVariant.h2}
                >
                    Вход
                </Typography>
                <Input
                    placeholder="Номер телефона"
                    type="tel"
                    setStateOnChange={setInputLogin}
                    value={inputLogin}
                />
                <Input
                    placeholder="Пароль"
                    type="password"
                    setStateOnChange={setInputPassword}
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
        </>
    );
};
