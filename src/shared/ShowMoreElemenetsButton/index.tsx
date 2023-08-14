import { Button } from '@shared/Button';

import { bem } from '@shared/utils/bem';

import { ShowMoreElemenetsButtonInterface } from './interfaces';

export const ShowMoreElemenetsButton = (props: ShowMoreElemenetsButtonInterface) => {
    const {
        elementsLength,
        defaultElementsLimit,
        currentElementsLimit,
        closeButtonTitle,
        openButtonTitle,
        buttonColor,
        buttonSize,
        setElLimit,
    } = props;
    const [block, element] = bem('show-more-elemenets-button');

    if ((elementsLength && (elementsLength < defaultElementsLimit)) || !elementsLength) {
        return null;
    }

    return (
        <div className={block('mt-3')}>
            {
                (elementsLength >= currentElementsLimit) ?
                    <Button
                        title={'Показать ещё' || openButtonTitle}
                        size={buttonSize}
                        color={buttonColor}
                        onClick={() => {
                            setElLimit(currentElementsLimit + defaultElementsLimit);
                        }}
                    />
                    : !(elementsLength < defaultElementsLimit) &&
                    <Button
                        title={'Скрыть' || closeButtonTitle}
                        size={buttonSize}
                        color={buttonColor}
                        onClick={() => setElLimit(defaultElementsLimit)}
                    />
            }
        </div>
    );
};
