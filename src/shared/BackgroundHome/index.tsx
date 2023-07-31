import { useAppSelector } from '@app/providers/store/hooks';

import { explorerIsExplorerSelector } from '@entities/explorer/model/selectors';

import { keeperIsKeeperSelector } from '@entities/keeper/model/selectors';

import { ShiningStar } from '@shared/ShiningStar';

import { bem } from '@shared/utils/bem';

import './styles.scss';

export const BackgroundHome = () => {
    const [block, element] = bem('background-home');

    const isExplorer = useAppSelector(explorerIsExplorerSelector);
    const isKeeper = useAppSelector(keeperIsKeeperSelector);

    const isAuth = isKeeper || isExplorer;

    return (
        <div className={block()}>
            <div className={element('static-bg')} />
            <div className={element('star-first')}>
                <ShiningStar size="small" />
            </div>
            <div className={element('star-second')}>
                <ShiningStar size="small" />
            </div>
            <div className={element('star-third')}>
                <ShiningStar />
            </div>
            <div className={element('star-fourth')}>
                <ShiningStar />
            </div>
            <div className={element('star-fifth')}>
                <ShiningStar size="small" />
            </div>
            <div className={element('noice')} />
            <div
                className={element('nebula-first', {
                    changePos: isAuth,
                })}
            />
            <div
                className={element('nebula-second', {
                    changePos: isAuth,
                })}
            />
            <div
                className={element('nebula-third', {
                    changePos: isAuth,
                })}
            />
        </div>
    );
};
