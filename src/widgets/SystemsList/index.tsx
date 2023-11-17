import { Rating } from '@shared/ui/Rating';
import System from '@shared/ui/System';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { SystemsListInterface } from './interfaces';
import {
	ratingScoreColor,
	ratingSize,
	ratingSystemColor,
} from '@shared/ui/Rating/interfaces';
import { systemColor } from '@shared/ui/System/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import system from '@shared/ui/System';

export const SystemsList = (props: SystemsListInterface) => {
	const { heading, systems, onSystemClick } = props;
	
	const [block, element] = bem('systems-list');
	
	if (systems.length === 0) return null;
	
	const handleOnSystemClick = (systemId: number) => () => {
		onSystemClick && onSystemClick(systemId);
	};
	
	return (
		<div className={block()}>
			<Typography
				className={element('heading', 'mt-5 mb-4')}
				variant={typographyVariant.h2}
			>
				{heading}
			</Typography>
			<div className={element('systems', 'mb-4')}>
				{systems?.map((system) => (
					<div
						className={element('system')}
						key={system.courseId}
						onClick={handleOnSystemClick(system.courseId)}
					>
						<System
							color={systemColor.primary500}
							key={system.courseId}
						>
							<p className={element('label')}>{system.title}</p>
							<div className={element('system-rating')}>
								<Rating
									scoreColor={ratingScoreColor.white}
									rating={system.rating}
									size={ratingSize.small}
									systemColor={ratingSystemColor.white}
								/>
							</div>
						</System>
					</div>
				))}
			</div>
		</div>
	);
};
