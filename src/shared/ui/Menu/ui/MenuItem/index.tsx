import { bem } from '@shared/utils';
import { MENU_BLOCK } from '@shared/ui/Menu';
import { MenuItemProps } from '@shared/ui/Menu/ui/MenuItem/interface';

export const MenuItem = (props: MenuItemProps) => {
    const { className, ...restProps } = props;

    const [block, element] = bem(MENU_BLOCK);

    return (
        <li className={element('item', className)} {...restProps} />
    );
};