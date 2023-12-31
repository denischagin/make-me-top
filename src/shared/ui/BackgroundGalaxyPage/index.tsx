import { ShiningStar } from '@shared/ui/ShiningStar';

import { bem } from '@shared/utils/helpers/bem';

import './styles.scss';

export const BackgroundGalaxyPage = () => {
    const [block, element] = bem('background-galaxy-page');

    return (
        <div className={block()}>
            <div className={element('star-first')}>
                <ShiningStar size='small' />
            </div>
            <div className={element('star-second')}>
                <ShiningStar size='small' />
            </div>
            <div className={element('star-third')}>
                <ShiningStar size='small' />
            </div>
            <div className={element('star-fourth')}>
                <ShiningStar />
            </div>
            <div className={element('star-fifth')}>
                <ShiningStar />
            </div>
        </div>
    );
};
