import { ShiningStar } from '@shared/ui/ShiningStar';

import { bem } from '@shared/utils/helpers/bem';

import './styles.scss';
import { useAuth } from '@entities/viewer';

export const BackgroundHome = () => {
    const [block, element] = bem('background-home');

    const { isAuth } = useAuth();

    return (
        <div className={block()}>
            <div className={element('static-bg')} />
            <div className={element('star-first')}>
                <ShiningStar size='small' />
            </div>
            <div className={element('star-second')}>
                <ShiningStar size='small' />
            </div>
            <div className={element('star-third')}>
                <ShiningStar />
            </div>
            <div className={element('star-fourth')}>
                <ShiningStar />
            </div>
            <div className={element('star-fifth')}>
                <ShiningStar size='small' />
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
