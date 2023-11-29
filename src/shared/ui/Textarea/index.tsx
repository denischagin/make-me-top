import { textareaColors, TextareaProps, textareaSizes } from '@shared/ui/Textarea/interface';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';

export const Textarea = ({
	className,
	fullwidth,
	color = textareaColors.black,
	size = textareaSizes.middle,
	...restProps
}: TextareaProps) => {
	const [block] = bem('textarea');
	
	return (
		<textarea
			className={
				block({
					fullwidth,
					color,
					size,
				}, className)
			}
			{...restProps}
		/>
	);
};