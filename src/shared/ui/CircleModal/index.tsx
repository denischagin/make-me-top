import { useEffect } from 'react';
import { Portal } from '@shared/ui/Portal';
import { Typography } from '@shared/ui/Typography';

import { useAppDispatch } from '@app/providers/store/hooks';

import { closeModal } from '@entities/user/model/slice';

import { ReactComponent as CloseIcon } from '@shared/images/close.svg';
import { ReactComponent as LockIcon } from '@shared/images/lock-big.svg';

import { bem } from '@shared/utils/helpers/bem';

import { CircleModalInterface } from './interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useEscModal } from '@shared/utils/hooks/use-esc-modal';

export const CircleModal = (props: CircleModalInterface) => {
    const { header, isLocked, children, onClose, isOpen } = props;

    const [block, element] = bem('circle-modal');

    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(closeModal());
        };
    }, []);

    useEscModal({
        handleClose: onClose,
        isOpen,
    });

    const lockIcon = isLocked && <LockIcon className={element('lock-icon')} />;

    return (
        <Portal target={document.body}>
            <div
                className={block({
                    open: isOpen,
                    close: !isOpen,
                })}
                onClick={onClose}
            >
                {/* <div className={element('background')} onClick={onClose} /> */}
                <div
                    className={element('container')}
                    onClick={(e) => e.stopPropagation()}
                >
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
