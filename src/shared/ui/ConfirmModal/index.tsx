import { useState } from 'react';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { ConfirmModalInterface } from './interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const ConfirmModal = (props: ConfirmModalInterface) => {
    const {
        confitmTitle,
        rejectButtonTitle,
        submitButtonTitle,
        onSubmit,
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
                        color={buttonColor.filled}
                        title={rejectButtonTitle}
                        onClick={onClose}
                    />
                    <Button
                        size={buttonSize.large}
                        color={buttonColor.black}
                        title={submitButtonTitle}
                        onClick={onSubmit}
                    />
                </div>
            </Modal>
        </div>
    );
};
