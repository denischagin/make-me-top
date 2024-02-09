import { ComponentProps } from 'react';

export interface AvatarInterface extends ComponentProps<'div'> {
    image?: string;
    size: avatarSize;
    orbit?: boolean;
    isActive?: boolean;

    hash?: string;
    personId?: number;
    type?: AvatarTypes;

}

export type AvatarTypes = 'NORMAL' | 'MINIATURE'

export enum avatarSize {
    small = 'small',
    medium = 'medium',
    mediumSmall = 'medium-small',
    large = 'large',
}
