import { Button } from '@shared/ui/Button';

import { ModalPlanetInterface } from '@entities/user/model/types';

import { ReactComponent as LockIcon } from '@shared/images/lock.svg';

import { bem } from '@shared/utils/helpers/bem';

import { PlanetListProps } from './interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

import './styles.scss';

export const PlanetList = (props: PlanetListProps) => {
	const {
		educationPlanetId,
		planetList,
		isSimple,
		onPlanetClick,
	} = props;
	
	const [block, element] = bem('planet-list');
	
	const currentPlanetFromList = planetList?.find(
		(item) => item.planetId === educationPlanetId,
	);
	
	return (
		<div className={block()}>
			{planetList?.map((planet, index) => (
				<div
					key={planet.planetId}
					className={element('item', {
						active:
							currentPlanetFromList &&
							planet.planetNumber < currentPlanetFromList.planetNumber,
						current: planet.planetId === educationPlanetId,
					})}
					onClick={() => {
						onPlanetClick && onPlanetClick(planet.planetId);
					}}
				>
                    <span className={element('name')}>
                        {++index}. {planet.planetName}
                    </span>
					{currentPlanetFromList &&
						planet.planetNumber > currentPlanetFromList.planetNumber && (
							<LockIcon className={element('lock-icon')} />
						)}
					{planet.planetId === educationPlanetId && (
						!isSimple &&  (
							<div className={element('info')}>
								<span className={element('item-text')}>
                                    Текущая планета
								</span>
								{
									<Button
										title="Обучение"
										size={buttonSize.small}
										color={buttonColor.primary500}
									/>
								}
							</div>
						)
					)}
				</div>
			))}
		</div>
	);
};
