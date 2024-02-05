import { ReactElement } from 'react';

export interface ShowUserInfoItemProps {
    renderIcon: (additionalClass: string) => ReactElement;
    text?: string;
    href?: string;
    notInfoText?: string;
}