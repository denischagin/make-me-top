import { Portal } from '@shared/ui/Portal';

import { ReactComponent as CloseIcon } from '@shared/images/close.svg';

import { bem } from '@shared/utils/helpers/bem';

import './styles.scss';
import { useEscModal } from '@shared/utils/hooks/use-esc-modal';
import { ModalInterface, modalPosition } from '@shared/ui/Modal/interface';

export const Modal = (props: ModalInterface) => {
    const {
        children,
        onClose,
        isOpen,
        fullwidth,
        position = modalPosition.top,
        closeOnBackground = true,
    } = props;

    const [block, element] = bem('modal');

    useEscModal({
        handleClose: onClose,
        isOpen,
    });

    const handleCloseOnBackgroundClick = () => {
        if (!closeOnBackground)
            return;

        onClose();
    };

    return (
        isOpen ?
            <Portal target={document.body}>
                <div
                    className={block({
                        open: isOpen,
                        close: !isOpen,
                        position,
                    })}
                    onClick={handleCloseOnBackgroundClick}
                >
                    <div
                        className={element('container', {
                            fullwidth,
                        })}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={element('content')}>
                            <CloseIcon
                                className={element('close-icon')}
                                onClick={onClose}
                            />
                            {children}
                        </div>
                    </div>
                </div>
            </Portal> : null
    );
};
