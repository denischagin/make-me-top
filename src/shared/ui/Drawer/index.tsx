import { DrawerProps } from '@shared/ui/Drawer/interface';
import { Portal } from '@shared/ui/Portal';
import { bem } from '@shared/utils/helpers/bem';
import './style.scss';
import React, { MouseEventHandler, useEffect } from 'react';

export const Drawer = ({
    isOpen,
    onClose,
    children,
    drawerContentProps,
    drawerProps,
}: DrawerProps) => {
    const [block, element] = bem('custom-drawer');

    useEffect(() => {
        return () => onClose();
    }, []);

    return (
        <Portal target={document.body}>
            <div
                {...drawerProps}
                className={block(
                    {
                        open: isOpen,
                        close: !isOpen,
                    },
                    drawerProps?.className,
                )}
                onClick={onClose}
            >
                <div
                    {...drawerContentProps}
                    className={element(
                        'content',
                        drawerContentProps?.className,
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};
