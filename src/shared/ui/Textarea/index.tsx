import { textareaColors, TextareaProps, textareaSizes } from '@shared/ui/Textarea/interface';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { forwardRef } from 'react';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
         className,
         fullwidth,
         color = textareaColors.black,
         size = textareaSizes.middle,
         ...restProps
     }, ref) => {
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
    });