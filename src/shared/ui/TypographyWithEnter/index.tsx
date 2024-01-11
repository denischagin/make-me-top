import { Fragment } from 'react';
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
                index === 0 ? (
                    <Typography
                        key={index}
                        className={element('text', {
                            'with-indent': withIndent,
                        })}
                        {...restProps}
                    >
                        {contentItem}
                    </Typography>
                ) : (
                    <Fragment key={index}>
                        {contentItem === '' && <br />}

                        <Typography
                            className={element('text', {
                                'with-indent': withIndent,
                            })}
                            {...restProps}
                        >
                            {contentItem}
                        </Typography>
                    </Fragment>
                ),
            )}
        </div>
    );
};