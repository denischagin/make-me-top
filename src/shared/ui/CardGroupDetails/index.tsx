import { CardGroupDetailsProps } from '@shared/ui/CardGroupDetails/interface';
import { bem } from '@shared/utils/helpers/bem';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { ArrowButton } from '@shared/ui/ArrowButton';
import { arrowButtonDirection, arrowButtonVariant } from '@shared/ui/ArrowButton/interfaces';
import './styles.scss'

export const CardGroupDetails = ({
	active,
	setActive,
	summary,
	content
}: CardGroupDetailsProps) => {
	const [block, element] = bem('card-group-details');
	
	const handleToggleActive = () => setActive(!active);
	
	return (
		<div className={block({
			active,
			inactive: !active
		})}>
			<div className={element('card')}>
				<Card size={cardSize.large} onClick={handleToggleActive}>
					<div className={element('content')}>
						<div className={element('info')}>
							{summary}
						</div>
						
						<ArrowButton
							variant={arrowButtonVariant.simple}
							direction={
								active
									? arrowButtonDirection.bottom
									: arrowButtonDirection.right
							}
						/>
					
					</div>
				</Card>
			
			</div>
			<div className={element('group-list')}>
				{active && content}
			</div>
		</div>
	);
};
