import { ComponentProps } from 'react';

export interface AvatarInterface extends ComponentProps<'div'> {
    image?: string;
    size: avatarSize;
    orbit?: boolean;
    isActive?: boolean;
}

export enum avatarSize {
    small = 'small',
    medium = 'medium',
    mediumSmall = 'medium-small',
    large = 'large',
}
