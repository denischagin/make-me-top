import { ShiningStar } from '@shared/ui/ShiningStar';

import { bem } from '@shared/utils/bem';

import './styles.scss';

export const BackgroundUsersList = () => {
    const [block, element] = bem('background-users-list');

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
                <ShiningStar size="small" />
            </div>
            <div className={element('star-fourth')}>
                <ShiningStar />
            </div>
        </div>
    );
};
