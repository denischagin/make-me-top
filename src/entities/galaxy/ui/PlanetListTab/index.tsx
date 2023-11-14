import { PlanetList } from '@shared/ui/PlanetList';
import { PlanetListTabProps } from './interface';
import { FinalGrade } from '@shared/ui/FinalGrade';

export const PlanetListTab = ({
    planets,
    currentPlanetId,
}: PlanetListTabProps) => {
    return (
        <>
            <PlanetList
                planetList={planets}
                educationPlanetId={currentPlanetId}
            />
            <FinalGrade />
        </>
    );
};
