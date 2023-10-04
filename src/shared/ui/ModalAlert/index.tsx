import { RequiredSystemsList } from '@shared/ui/RequiredSystemsList';

import { bem } from '@shared/utils/helpers/bem';

import { ModalAlertInterface } from './interfaces';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';

import './styles.scss';

export const ModalAlert = (props: ModalAlertInterface) => {
    const {
        dependencies,
        title,
        children,
        handleChangeSystem,
    } = props;

    const [block, element] = bem('modal-alert');

    return (
        <div className={block()}>
            <div className={element('title')}>{title}</div>
            {title === ModalAccessStatus.closed_needSystems && (
                <RequiredSystemsList
                    list={dependencies}
                    handleChangeSystem={handleChangeSystem}
                />
            )}
            {children}
        </div>
    );
};
