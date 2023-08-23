import { RequiredSystemsList } from '@shared/RequiredSystemsList';

import { bem } from '@shared/utils/bem';

import {
    ModalAlertInterface,
} from './interfaces';
import { ModalAccessStatus } from '@shared/CircleModal/interfaces';

import './styles.scss';


export const ModalAlert = (props: ModalAlertInterface) => {
    const {
        dependencies,
        title,
        children,
    } = props;

    const [block, element] = bem('modal-alert');

    return (
        <div className={block()}>
            <div className={element('title')}>
                {title}
            </div>
            {
                (title === ModalAccessStatus.closed_needSystems) &&
                <RequiredSystemsList
                    list={dependencies}
                />
            }
            {children}
        </div>
    );
};