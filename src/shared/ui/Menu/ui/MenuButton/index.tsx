import { MenuButtonProps } from './interface';
import { bem } from '@shared/utils';
import { MENU_BLOCK, useMenu } from '@shared/ui/Menu';
import { MouseEventHandler } from 'react';

export const MenuButton = (props: MenuButtonProps) => {
    const { className, ...restProps } = props;

    const [block, element] = bem(MENU_BLOCK);

    const { handleToggle } = useMenu();

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();

        handleToggle && handleToggle();
    };

    return (
        <button {...restProps} className={element('button')} onClick={handleButtonClick} />
    );
};