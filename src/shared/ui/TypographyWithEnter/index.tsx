import { TypographyWithEnterProps } from '@shared/ui/TypographyWithEnter/interface';
import { Typography } from '@shared/ui/Typography';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';

export const TypographyWithEnter = ({ children, withIndent = true, ...restProps }: TypographyWithEnterProps) => {
    const [block, element] = bem('typography-with-enter');
    const contentItems = children?.split('\n');

    return (
        <div className={block()}>
            {contentItems?.map((contentItem, index) =>
                    !!contentItem && (
                        <Typography
                            key={index}
                            className={element('text', {
                                'with-indent': withIndent,
                            })}
                            {...restProps}
                        >
                            {contentItem}
                        </Typography>
                    ),
            )}
        </div>
    );
};