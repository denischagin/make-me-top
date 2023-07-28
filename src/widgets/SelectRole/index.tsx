import { useAppDispatch } from '@app/providers/store/hooks';

import { selectRoleAsExplorer } from '@entities/explorer/model/slice';

import { selectRoleAsKeeper } from '@entities/curator/model/slice';

import { PlanetButton } from '@shared/PlanetButton';

export const SelectRole = () => {
    const dispatch = useAppDispatch();

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
        </>
    );
};
