import {
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { PlanetButton } from '@shared/ui/PlanetButton';

import {
    URL_GALAXY,
    URL_LOGIN_AS_EXPLORER,
    URL_LOGIN_AS_KEEPER,
} from '@shared/constants/links';

export const SelectRole = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <PlanetButton
                onClick={() =>
                    navigate(URL_LOGIN_AS_EXPLORER + location.search)
                }
                title='Я – исследователь'
            />

            <PlanetButton
                onClick={() => navigate(URL_LOGIN_AS_KEEPER + location.search)}
                title='Я – хранитель'
            />

            <PlanetButton
                onClick={() => navigate(URL_GALAXY)}
                title='Я – гость'
            />
        </>
    );
};
