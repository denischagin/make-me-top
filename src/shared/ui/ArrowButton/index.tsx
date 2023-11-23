import { ReactComponent as ArrowIcon } from '@shared/images/arrow.svg';
import { ReactComponent as ArrowIconSimple } from '@shared/images/arrow-simple.svg';

import { bem } from '@shared/utils/helpers/bem';

import { arrowButtonColor, ArrowButtonInterface, arrowButtonVariant } from './interfaces';

import './styles.scss';
import { ReactElement } from 'react';


export const ArrowButton = (props: ArrowButtonInterface) => {
	const {
		direction,
		className,
		variant = arrowButtonVariant.default,
		color = arrowButtonColor.transparent,
		...restProps
	}: ArrowButtonInterface = props;
	
	const [block, element] = bem('arrow-button');
	
	const arrowButtonFromVariant: Record<arrowButtonVariant, ReactElement> = {
		[arrowButtonVariant.default]: <ArrowIcon className={element('arrow')} />,
		[arrowButtonVariant.simple]: <ArrowIconSimple className={element('arrow')} />,
	};
	
	return (
		<div
			className={block(
				{
					direction,
					color
				},
				className,
			)}
			{...restProps}
		>
			{arrowButtonFromVariant[variant]}
			<div className={element('circle')} />
		</div>
	);
};
