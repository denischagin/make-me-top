import { bem } from '@shared/utils/helpers/bem';

import { TypographyInterface } from './interfaces';

import './styles.scss';
import { Fragment } from 'react';

export const Typography = (props: TypographyInterface) => {
    const { className, color, variant, children, parseLink, ...restProps } = props;

    const [block, element] = bem('typography');
    const regex = /(?<=\s|^)(?:www\.)?([a-zA-Z0-9-.]+\.(com|org|net|ru|gov|edu|mil|int|info|biz|name|pro|aero|coop|museum))/ig;
    const regexWithHttps = /(?<=\s|^)https?:\/\/(?:www\.)?([a-zA-Z0-9-.]+\.(com|org|net|ru|gov|edu|mil|int|info|biz|name|pro|aero|coop|museum))/ig;
    const isStringChildren = typeof children === 'string';

    return (
        <p
            {...restProps}
            className={block(
                {
                    color,
                    variant,
                },
                className,
            )}
        >
            {isStringChildren && parseLink ? children.split(/[\s\n]/i).map((word, index) => {
                const isUrlWithHttp = regexWithHttps.test(word);
                const isUrl = regex.test(word);

                if (isUrl || isUrlWithHttp)
                    return (
                        <Fragment key={index}>
                            <a href={(isUrlWithHttp ? '' : 'http://') + word}
                               target='_blank'>{word}</a>
                            {' '}
                        </Fragment>
                    );

                return (
                    <Fragment key={index}>
                        {word}{' '}
                    </Fragment>
                );
            }) : (
                children
            )}
        </p>
    );
};
