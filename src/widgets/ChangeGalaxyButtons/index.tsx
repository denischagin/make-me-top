import { ButtonChangeCurrentGalaxy } from '@features/ButtonChangeCurrentGalaxy';
import { EntryAnimateGalaxies } from '@shared/ui/EntryAnimateGalaxies';

import { ReactComponent as CurrentGalaxy } from '@shared/images/current-galaxy.svg';

import { bem } from '@shared/utils/helpers/bem';

import { ChangeGalaxyButtonsProps } from './interface';

import './style.scss';

export const ChangeGalaxyButtons = ({
    nextGalaxyName,
    handleNextGalaxy,
    prevGalaxyName,
    handlePrevGalaxy,
}: ChangeGalaxyButtonsProps) => {
    const [block, element] = bem('change-galaxy-buttons');

    return (
        <EntryAnimateGalaxies delay={0.1} duration={1} className={block()}>
            <div className={element('button-orbit')}>
                <ButtonChangeCurrentGalaxy
                    content={prevGalaxyName}
                    onClick={handlePrevGalaxy}
                />
            </div>

            <CurrentGalaxy />

            <div className={element('button-orbit')}>
                <ButtonChangeCurrentGalaxy
                    content={nextGalaxyName}
                    onClick={handleNextGalaxy}
                />
            </div>
        </EntryAnimateGalaxies>
    );
};
