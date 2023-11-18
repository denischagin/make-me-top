import { TextareaProps } from '@shared/ui/Textarea/interface';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';

export const Textarea = ({ className, fullwidth, ...restProps }: TextareaProps) => {
    const [block] = bem('textarea');

    return (
        <textarea
            className={
                block({
                    fullwidth,
                }, className)
            }
            {...restProps}
        />
    );
};