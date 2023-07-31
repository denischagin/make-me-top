import { RequiredStarsList } from '@shared/RequiredStarsList';

import { bem } from '@shared/utils/bem';

import {
    ModalAlertInterface,
} from './interfaces';
import { ModalAccessStatus } from '@shared/CircleModal/interfaces';

import './styles.scss';


export const ModalAlert = (props: ModalAlertInterface) => {
    const {
        starStatus,
        dependencies,
        title,
        children,
    } = props;

    const [block, element] = bem('modal-alert');

    return (
        <div className={block()}>
            <div className={element('title')}>
                {
                    title
                        ? title
                        : starStatus
                }
            </div>
            {starStatus === ModalAccessStatus.closed_needStars ?
                <RequiredStarsList
                    list={dependencies}
                />
                : null}
            {children}
        </div>
    );
};