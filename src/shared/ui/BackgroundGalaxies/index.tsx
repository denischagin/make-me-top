import React from 'react';
import { ShiningStar } from '@shared/ui/ShiningStar';

import { bem } from '@shared/utils/bem';

import './styles.scss';

export const BackgroundGalaxies = () => {
    const [block, element] = bem('background-galaxies-page');

    return (
        <div className={block()}>
            <div className={element('star', 'star-first')}>
                <ShiningStar size="small" />
            </div>
            <div className={element('star', 'star-second')}>
                <ShiningStar size="small" />
            </div>
            <div className={element('star', 'star-third')}>
                <ShiningStar size="small" />
            </div>
            <div className={element('star', 'star-fourth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-fifth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-sixth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-seventh')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-eighth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-ninth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-tenth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-eleventh')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-twelfth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-thirteenth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-fourteenth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-fifteenth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-sixteenth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-seventeenth')}>
                <ShiningStar />
            </div>
            <div className={element('star', 'star-eighteenth')}>
                <ShiningStar />
            </div>
        </div>
    );
};
