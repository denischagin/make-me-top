import { Button } from '@shared/ui/Button';

import { bem } from '@shared/utils/helpers/bem';

import { ShowMoreElemenetsButtonInterface } from './interfaces';

export const ShowMoreElemenetsButton = (
    props: ShowMoreElemenetsButtonInterface,
) => {
    const {
        elementsLength,
        defaultElementsLimit,
        currentElementsLimit,
        closeButtonTitle,
        openButtonTitle,
        buttonColor,
        buttonSize,
        setElementsLimit,
    } = props;
    const [block, element] = bem('show-more-elemenets-button');

    if (
        (elementsLength && elementsLength < defaultElementsLimit) ||
        !elementsLength
    ) {
        return null;
    }

    return (
        <div className={block('mt-3')}>
            {elementsLength >= currentElementsLimit ? (
                <Button
                    title={'Показать ещё' || openButtonTitle}
                    size={buttonSize}
                    color={buttonColor}
                    onClick={() => {
                        setElementsLimit(
                            currentElementsLimit + defaultElementsLimit,
                        );
                    }}
                />
            ) : (
                !(elementsLength < defaultElementsLimit) && (
                    <Button
                        title={'Скрыть' || closeButtonTitle}
                        size={buttonSize}
                        color={buttonColor}
                        onClick={() => setElementsLimit(defaultElementsLimit)}
                    />
                )
            )}
        </div>
    );
};
