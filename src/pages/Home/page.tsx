import { useAppSelector } from '@app/providers/store/hooks';

import { explorerIsExplorerSelector } from '@entities/explorer/model/selectors';

import { keeperIsKeeperSelector } from '@entities/curator/model/selectors';

import { BackgroundHome } from '@shared/BackgroundHome';

import { ReactComponent as MakeMeTopIcon } from '@shared/images/make-me-top.svg';

import { bem } from '@shared/utils/bem';

import { Login } from '@widgets/Login';
import { SelectRole } from '@widgets/SelectRole';

import './styles.scss';

export const Home = () => {
    const [block, element] = bem('home');

    const isExplorer = useAppSelector(explorerIsExplorerSelector);
    const isKeeper = useAppSelector(keeperIsKeeperSelector);

    const isRoleSelected = isExplorer || isKeeper;

    return (
        <>
            <BackgroundHome />
            <div className={block()}>
                <div
                    className={element('planet', {
                        isRoleSelected,
                    })}
                />
                <div className={element('fields')}>
                    <p className={element('heading')}>
                        <MakeMeTopIcon />
                    </p>
                    {
                        !isRoleSelected
                            ? <SelectRole />
                            : <Login />
                    }
                </div>
            </div>
        </>
    );
};