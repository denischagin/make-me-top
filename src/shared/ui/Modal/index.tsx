import { Portal } from '@shared/ui/Portal';

import { ReactComponent as CloseIcon } from '@shared/images/close.svg';

import { bem } from '@shared/utils/bem';

import { ReviewModalInterface } from '@shared/types/common';

import './styles.scss';

export const Modal = (props: ReviewModalInterface) => {
    const {
        children,
        onClose,
    } = props;

    const [block, element] = bem('modal');

    return (
        <Portal target={document.body}>
            <div className={block()}>
                <div className={element('container')}>
                    <div className={element('content')}>
                        <CloseIcon
                            className={element('close-icon')}
                            onClick={onClose}
                        />
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};