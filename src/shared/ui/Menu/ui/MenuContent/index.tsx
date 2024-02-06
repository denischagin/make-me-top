import { bem } from '@shared/utils';
import { MENU_BLOCK, useMenu } from '@shared/ui/Menu';
import { ReactNode } from 'react';

export const MenuContent = ({ children }: { children: ReactNode }) => {
    const [, element] = bem(MENU_BLOCK);

    const { isOpen } = useMenu();

    return (
        <>
            {isOpen && (
                <ul className={element('content')}>
                    {children}
                </ul>
            )}
        </>
    );
};