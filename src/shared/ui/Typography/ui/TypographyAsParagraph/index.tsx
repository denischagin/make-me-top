import { Fragment } from 'react';
import { TypographyAsLink, TypographyAsParagraphProps } from '@shared/ui/Typography/ui';
import { useTypographyClass } from '@shared/ui/Typography/libs';

export const TypographyAsParagraph = (props: TypographyAsParagraphProps) => {
    const {
        color,
        variant,
        children,
        parseLink,
        as,
        ...restProps
    } = props;
    const className = useTypographyClass({ ...props });

    const regex = /(?<=\s|^)(?:www\.)?([a-zA-Z0-9-.]+\.(com|org|net|ru|gov|edu|mil|int|info|biz|name|pro|aero|coop|museum))/ig;
    const regexWithHttps = /(?<=\s|^)https?:\/\/(?:www\.)?([a-zA-Z0-9-.]+\.(com|org|net|ru|gov|edu|mil|int|info|biz|name|pro|aero|coop|museum))/ig;
    const isStringChildren = typeof children === 'string';

    return (
        <p
            {...restProps}
            className={className}
        >
            {isStringChildren && parseLink ? children.split(/[\s\n]/i).map((word, index) => {
                const isUrlWithHttp = regexWithHttps.test(word);
                const isUrl = regex.test(word);

                if (isUrl || isUrlWithHttp)
                    return (
                        <Fragment key={index}>
                            <TypographyAsLink
                                href={(isUrlWithHttp ? '' : 'http://') + word}
                                target='_blank'
                                color={color}
                                variant={variant}
                            >
                                {word}
                            </TypographyAsLink>
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