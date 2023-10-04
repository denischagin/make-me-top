import React from 'react';

import { bem } from '@shared/utils/helpers/bem';

import './styles.scss';

interface ITitleGalaxyPage {
    galaxyName: string;
}

export const TitleGalaxyPage: React.FC<ITitleGalaxyPage> = (props) => {
    const {
        galaxyName,
    } = props;

    const [block, element] = bem('galaxy-page-name');

    return (
        <div className={block()}>
            <div className={element('page-context')}>Галактика</div>
            <div className={element('galaxy-name')}>{galaxyName}</div>
        </div>
    );
};
