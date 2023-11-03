import { HEADER_LINKS, URL_LOGIN } from '@shared/constants/links';
import { ReactComponent as ExitIcon } from '@shared/images/exit.svg';
import { Drawer } from '@shared/ui/Drawer';
import { RouterLink } from '@shared/ui/RouterLink';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import './style.scss';
import { DrawerMenuProps } from '@widgets/Header/ui/DrawerMenu/interface';
import { ArrowButton } from '@shared/ui/ArrowButton';
import { arrowButtonDirection } from '@shared/ui/ArrowButton/interfaces';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@entities/viewer';

export const DrawerMenu = ({
	isOpen,
	onClose,
	onSignOut,
	links = HEADER_LINKS
}: DrawerMenuProps) => {
	const [block, element] = bem('drawer-menu');
	const location = useLocation();
	const { isAuth } = useAuth();
	
	return (
		<Drawer
			isOpen={isOpen}
			onClose={onClose}
			drawerProps={{
				className: block(),
			}}
		>
			<div className={element('content')}>
				<div className={element('arrow-button-wrapper')}>
					<ArrowButton
						direction={arrowButtonDirection.right}
						className={element('arrow-button')}
						onClick={onClose}
					/>
				</div>
				
				<ul className={element('menu')}>
					{links.map(
						({ link, text, isSignOutButton }) =>
							!isSignOutButton && (
								<RouterLink to={link} key={link}>
									<li
										className={element('menu-item', {
											active: location.pathname === link,
										})}
										onClick={onClose}
									>
										<Typography
											variant={typographyVariant.h1}
										>
											{text}
										</Typography>
									</li>
								</RouterLink>
							),
					)}
				</ul>
				{isAuth && (
					<li
						className={element('menu-item', {
							'sign-out': true,
						})}
						onClick={() => {
							onClose();
							onSignOut();
						}}
					>
						<Typography variant={typographyVariant.h1}>
							Выйти
						</Typography>
						
						<ExitIcon />
					</li>
				)}
			</div>
		</Drawer>
	);
};
