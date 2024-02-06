import { bem } from '@shared/utils';
import { MENU_BLOCK } from '@shared/ui/Menu';
import { MenuProps } from './interface';
import '../styles.scss';
import { createContext, useContext, useEffect, useState } from 'react';

interface MenuContextInterface {
    isOpen?: boolean;
    handleOpen?: () => void;
    handleClose?: () => void;
    handleToggle?: () => void;
}

const MenuContext = createContext<MenuContextInterface>({});
export const useMenu = () => useContext(MenuContext);

export const Menu = (props: MenuProps) => {
    const {
        className,
        children,
        ...restProps
    } = props;

    const [block] = bem(MENU_BLOCK);

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    };

    const handleWindowClick = () => {
        handleClose();
    };

    useEffect(() => {
        window.addEventListener('click', handleWindowClick);

        return () => window.removeEventListener('click', handleWindowClick);
    }, []);


    return (
        <div className={block(className)} {...restProps}>
            <MenuContext.Provider value={{ handleOpen, handleClose, isOpen, handleToggle }}>
                {children}
            </MenuContext.Provider>
        </div>
    );
};