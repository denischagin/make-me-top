import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { ConfirmModalInterface } from './interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { useEscModal } from '@shared/utils/hooks/use-esc-modal';

export const ConfirmModal = (props: ConfirmModalInterface) => {
    const {
        confirmTitle,
        confirmDescription,
        rejectButtonTitle,
        submitButtonTitle,
        onSubmit,
        onClose,
        isOpen,
        children,
    } = props;

    const [block, element] = bem('confirm-modal');

    useEscModal({
        handleClose: onClose,
        isOpen: true,
    });

    return (
        isOpen ?
            <Modal onClose={onClose} isOpen={isOpen}>
                <div className={block()}>
                    <Typography
                        variant={typographyVariant.h2}
                        color={typographyColor.black}
                        className={element('modal-text')}
                    >
                        {confirmTitle}
                    </Typography>

                    {confirmDescription &&
                        <Typography
                            color={typographyColor.black}
                            variant={typographyVariant.regular16}
                            className={element('modal-text')}
                        >
                            {confirmDescription}
                        </Typography>
                    }

                    <div>
                        {children}
                    </div>

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
                </div>
            </Modal>
            : null);
};
