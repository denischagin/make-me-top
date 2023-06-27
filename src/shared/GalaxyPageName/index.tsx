import React from 'react';

import { bem } from '@shared/utils/bem';

import './styles.scss';

interface IGalaxyPageName {
  galaxyName: string;
}

export const GalaxyPageName: React.FC<IGalaxyPageName> = (props) => {
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
