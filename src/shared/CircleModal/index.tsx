import { ModalAlert } from '@shared/ModalAlert';
import { Portal } from '@shared/Portal';
import { Typography } from '@shared/Typography';

import { ReactComponent as CloseIcon } from '@shared/images/close.svg';
import { ReactComponent as LockIcon } from '@shared/images/lock-big.svg';

import { bem } from '@shared/utils/bem';
import { getModalStatus } from '@shared/utils/getModalStatus';
import { getNotStudiedParentDependencies } from '@shared/utils/getNotStudiedParentDependencies';

import {
    ModalAccessStatus,
    ModalInterface,
} from './interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/Typography/interfaces';

import './styles.scss';

export const CircleModal = (props: ModalInterface) => {
    const {
        header,
        isLocked,
        data,
        children,
        onClose,
    } = props;

    const [block, element] = bem('circle-modal');

    const modalStatus = data ?
        getModalStatus({
            lastChosenStar: data.lastChosenStar,
            userProgress: data.userProgress,
        })
        : ModalAccessStatus.opened;
    const notStudiedParentDependencies = data ?
        getNotStudiedParentDependencies({
            lastChosenStar: data.lastChosenStar,
            userProgress: data.userProgress,
        })
        : [];

    const lockIcon = isLocked && <LockIcon className={element('lock-icon')} />;

    return (
        <Portal target={document.body}>
            <div className={block()}>
                <div className={element('content')}>
                    <div className={element('header')}>
                        <Typography
                            variant={typographyVariant.h2}
                            color={typographyColor.black}
                            className={element('name')}
                        >
                            {lockIcon}
                            {header}
                        </Typography>
                        <CloseIcon
                            className={element('close-icon')}
                            onClick={onClose}
                        />
                    </div>
                    {
                        (modalStatus !== ModalAccessStatus.opened) ?
                            <ModalAlert
                                title={modalStatus}
                                dependencies={notStudiedParentDependencies}
                            />
                            : null
                    }
                    <div className={element('item-list')}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
