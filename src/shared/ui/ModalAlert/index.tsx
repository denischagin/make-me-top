import { RequiredSystemsList } from '@shared/ui/RequiredSystemsList';

import { bem } from '@shared/utils/helpers/bem';

import { ModalAlertInterface } from './interfaces';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';

import './styles.scss';

export const ModalAlert = (props: ModalAlertInterface) => {
    const { dependencies, title, handleChangeSystem, isExplorer } = props;

    const [block, element] = bem('modal-alert');

    return (
        <>
            {title && title !== ModalAccessStatus.opened && isExplorer && (
                <div className={block()}>
                    <div className={element('title')}>{title}</div>
                    {dependencies?.length !== 0 && (
                        <RequiredSystemsList
                            systemList={dependencies}
                            handleChangeSystem={handleChangeSystem}
                        />
                    )}
                </div>
            )}
        </>
    );
};
