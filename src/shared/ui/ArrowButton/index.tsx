import { ReactComponent as ArrowIcon } from '@shared/images/arrow.svg';
import { ReactComponent as ArrowIconSimple } from '@shared/images/arrow-simple.svg';

import { bem } from '@shared/utils/helpers/bem';

import { ArrowButtonInterface, arrowButtonVariant } from './interfaces';

import './styles.scss';

export const ArrowButton = (props: ArrowButtonInterface) => {
	const { direction, className, variant = arrowButtonVariant.default, ...restProps }: ArrowButtonInterface = props;
	
	const [block, element] = bem('arrow-button');
	
	return (
		<div
			className={block(
				{
					direction,
				},
				className,
			)}
			{...restProps}
		>
			{variant === arrowButtonVariant.default &&
			  <ArrowIcon className={element('arrow')} />
			}
			
			{variant === arrowButtonVariant.simple &&
			  <ArrowIconSimple className={element('arrow')} />
			}
			<div className={element('circle')} />
		</div>
	);
};
