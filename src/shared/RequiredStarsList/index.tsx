import { Button } from '@shared/Button';

import { ReactComponent as StarIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/bem';

import {
    RequiredStarInterface,
    RequiredStarsListInterface,
} from './interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';

import './styles.scss';

export const RequiredStarsList = (props: RequiredStarsListInterface) => {
    const {
        list,
    } = props;

    const [block, element] = bem('required-list');

    return (
        <div className={block()}>
            {list.map((star: RequiredStarInterface) => (
                <div
                    key={star.id}
                    className={element('item')}
                >
                    <div className={element('star')}>
                        <StarIcon className={element('star-icon')} />
                        <span className={element('name')}>{star.name}</span>
                    </div>
                    <div className={element('info')}>
                        <div className={element('button')}>
                            <Button
                                size={buttonSize.small}
                                color={buttonColor.filled}
                                title="Перейти"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
