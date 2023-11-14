import { bem } from '@shared/utils/helpers/bem';
import { PlanetListTabsProps } from '@shared/ui/PlanetListTabs/interface';
import './styles.scss';

export const PlanetListTabs = (props: PlanetListTabsProps) => {
	const {
		planets,
		selectedPlanetId,
		educationPlanetId,
		status,
		onPlanetClick
	} = props;
	
	const [block, element] = bem('planet-list-tabs');
	
	
	return (
		<div className={block()}>
			{planets?.map((planet, index) => (
				<div
					key={planet.planetId}
					className={element('item', {
						education: planet.planetId === educationPlanetId,
						selected: planet.planetId === selectedPlanetId
					})}
					onClick={() => onPlanetClick && onPlanetClick(planet.planetId)}
				>
					<p>
						{index + 1}. {planet.planetName}
					</p>
				</div>
			))}
		</div>
	);
};