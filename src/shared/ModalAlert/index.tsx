import { bem } from '@shared/utils/bem';

import { ModalAlertInterface } from './interfaces';

import './styles.scss';

export const ModalAlert = (props: ModalAlertInterface) => {
    const {
        title, children,
    } = props;

    const [block, element] = bem('modal-alert');

    return (
        <div className={block()}>
            <div className={element('title')}>{title}</div>
            {children}
        </div>
    );
};
