import { useNavigate } from 'react-router-dom';
import { PlanetButton } from '@shared/ui/PlanetButton';

import { useAppDispatch } from '@app/providers/store/hooks';

import { selectRoleAsExplorer } from '@entities/explorer/model/slice';

import { selectRoleAsKeeper } from '@entities/keeper/model/slice';

import { URL_GALAXY } from '@shared/constants/links';

export const SelectRole = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <PlanetButton
                onClick={() => dispatch(selectRoleAsExplorer())}
                title="Я – исследователь"
            />

            <PlanetButton
                onClick={() => dispatch(selectRoleAsKeeper())}
                title="Я – хранитель"
            />

            <PlanetButton
                onClick={() => navigate(URL_GALAXY)}
                title="Я – гость"
            />
        </>
    );
};
