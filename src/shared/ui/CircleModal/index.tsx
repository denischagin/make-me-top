import { useEffect } from 'react';
import { ModalAlert } from '@shared/ui/ModalAlert';
import { Portal } from '@shared/ui/Portal';
import { Typography } from '@shared/ui/Typography';

import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';

import { userCourseInfoSelector } from '@entities/user/model/selectors';
import { closeModal } from '@entities/user/model/slice';

import { ReactComponent as CloseIcon } from '@shared/images/close.svg';
import { ReactComponent as LockIcon } from '@shared/images/lock-big.svg';

import { bem } from '@shared/utils/helpers/bem';
import { getModalStatus } from '@shared/utils/helpers/getModalStatus';
import { getNotStudiedParentDependencies } from '@shared/utils/helpers/getNotStudiedParentDependencies';

import { ModalAccessStatus, ModalInterface } from './interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const CircleModal = (props: ModalInterface) => {
    const {
        header,
        isLocked,
        data,
        children,
        onClose,
        isOpen,
        handleChangeSystem,
    } = props;

    const [block, element] = bem('circle-modal');

    const dispatch = useAppDispatch();

    //TODO
    const courseInfo = useAppSelector(userCourseInfoSelector);

    useEffect(() => {
        return () => {
            dispatch(closeModal());
        };
    }, []);

    const lockIcon = isLocked && <LockIcon className={element('lock-icon')} />;

    return (
        <Portal target={document.body}>
            <div
                className={block({
                    open: isOpen,
                    close: !isOpen,
                })}
            >
                <div className={element('background')} onClick={onClose} />
                <div className={element('container')}>
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

                        <div className={element('item-list')}>{children}</div>
                    </div>
                </div>
            </div>
        </Portal>
    );
};
