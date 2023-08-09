
import { useState } from 'react';

import { Button } from '@shared/Button';
import { Modal } from '@shared/Modal';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { ConfirmModalInterface } from './interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/Typography/interfaces';

import './styles.scss';


export const ConfirmModal = (props: ConfirmModalInterface) => {
    const {
        confitmTitle,
        confirmButtonTitle,
        declineButtonTitle,
        onClose,
    } = props;

    const [block, element] = bem('confirm-modal');

    return (
        <div className={block()}>
            <Modal onClose={onClose}>
                <Typography
                    variant={typographyVariant.h2}
                    color={typographyColor.black}
                    className={element('modal-text')}
                >
                    {confitmTitle}
                </Typography>
                <div className={element('modal-buttons')}>
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.black}
                        title={declineButtonTitle}
                        onClick={onClose}
                    />
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.filled}
                        title={confirmButtonTitle}
                        onClick={onClose}
                    />
                </div>
            </Modal>
        </div>
    );
};
