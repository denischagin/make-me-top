import { bem } from '@shared/utils';
import { stackDirection, StackProps, stackSpacing } from '@shared/ui/Stack/interface';
import './styles.scss';

export const Stack = (props: StackProps) => {
    const {
        spacing = stackSpacing.small,
        direction = stackDirection.vertical,
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
                },
                className,
            )}
            {...restProps}
        />
    );
};