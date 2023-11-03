import { HeaderLinkInterface } from '@shared/constants/links';

export interface DrawerMenuProps {
	onClose: () => void;
	onSignOut: () => void;
	isOpen: boolean;
	links?: HeaderLinkInterface[];
}
