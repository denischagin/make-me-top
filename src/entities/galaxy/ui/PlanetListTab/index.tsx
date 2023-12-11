import { PlanetList } from '@shared/ui/PlanetList';
import { PlanetListTabProps } from './interface';
import { FinalGrade } from '@shared/ui/FinalGrade';
import { useNavigate } from 'react-router-dom';
import { getUrlThemeByCourseId, getUrlThemeByCourseIdAndThemeId } from '@shared/constants/links';

export const PlanetListTab =
    ({
         planets,
         currentPlanetId,
         currentCourseId,
         allPlanetsLocked,
     }: PlanetListTabProps) => {
        const navigate = useNavigate();

        const handlePlanetClick = (planetId: number) => {
            navigate(getUrlThemeByCourseIdAndThemeId({ themeId: planetId, courseId: currentCourseId! }));
        };

        return (
            <>
                <PlanetList
                    planetList={planets}
                    educationPlanetId={currentPlanetId}
                    currentCourseId={currentCourseId!}
                    onPlanetClick={handlePlanetClick}
                    allPlanetsLocked={allPlanetsLocked}
                />
                <FinalGrade />
            </>
        );
    };
