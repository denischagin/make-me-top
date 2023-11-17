export interface AvatarInterface {
    image?: string;
    size: avatarSize;
    orbit?: boolean;
}

export enum avatarSize {
    small = 'small',
    medium = 'medium',
    mediumSmall = 'medium-small',
    large = 'large',
}
