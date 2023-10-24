import { HEADER_LINKS, URL_LOGIN } from '@shared/constants/links';
import { ReactComponent as ExitIcon } from '@shared/images/exit.svg';
import { Drawer } from '@shared/ui/Drawer';
import { RouterLink } from '@shared/ui/RouterLink';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import './style.scss';
import { DrawerMenuProps } from '@widgets/Header/ui/DrawerMenu/interface';

export const DrawerMenu = ({ isOpen, onClose }: DrawerMenuProps) => {
    const links = HEADER_LINKS;
    const [block, element] = bem('drawer-menu');

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            drawerProps={{
                className: block(),
            }}
        >
            <div className={element('content')}>
                {links.map((item) =>
                    item.link === URL_LOGIN ? (
                        <li
                            key={item.link}
                            className={element('link', {
                                'sign-out': true,
                            })}
                            onClick={onClose}
                        >
                            <Typography variant={typographyVariant.h1}>
                                {item.text}
                            </Typography>
                            <ExitIcon />
                        </li>
                    ) : (
                        <li className={element('link')} onClick={onClose}>
                            <Typography variant={typographyVariant.h1}>
                                <RouterLink to={item.link}>
                                    {item.text}
                                </RouterLink>
                            </Typography>
                        </li>
                    ),
                )}
            </div>
        </Drawer>
    );
};
