import { useState } from 'react';
import { Modal } from '@shared/ui/Modal';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';
import { sliceString } from '@shared/utils/helpers/sliceString';

import { ShowMoreTextModalInterface } from './interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const ShowMoreTextModal = (props: ShowMoreTextModalInterface) => {
    const {
        text,
        maxLength,
        children,
        typographySettings: { variant = typographyVariant.regular14, color },
    } = props;

    const [block, element] = bem('show-more-text');
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {isExpanded && (
                <Modal onClose={() => setIsExpanded(false)}>{children}</Modal>
            )}
            <div className={block()}>
                <div className={element('content')}>
                    <Typography
                        className={element('text')}
                        variant={variant}
                        color={color}
                    >
                        {sliceString(text, maxLength)}
                    </Typography>
                    {text?.length > maxLength && (
                        <Typography
                            className={element('expand')}
                            onClick={() => setIsExpanded(true)}
                            variant={typographyVariant.regular14}
                        >
                            Прочитать полностью
                        </Typography>
                    )}
                </div>
            </div>
        </>
    );
};
