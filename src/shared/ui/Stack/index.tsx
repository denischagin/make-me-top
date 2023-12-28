import { bem } from '@shared/utils';
import { stackAlign, stackDirection, StackProps, stackSpacing } from '@shared/ui/Stack/interface';
import './styles.scss';

export const Stack = (props: StackProps) => {
    const {
        spacing = stackSpacing.small,
        direction = stackDirection.vertical,
        align = stackAlign.stretch,
        className,
        ...restProps
    } = props;
    const [block, element] = bem('stack');

    return (
        <div
            className={block(
                {
                    spacing,
                    direction,
                    align,
                },
                className,
            )}
            {...restProps}
        />
    );
};