import { ReactNode } from 'react';

import {
    typographyColor,
    typographyVariant,
} from '@shared/Typography/interfaces';

export interface ShowMoreTextModalInterface {
    text: string;
    children: ReactNode;
    maxLength: number;
    content?: string;
    typographySettings: TypographySettingsInterface;
}

export interface TypographySettingsInterface {
    variant?: typographyVariant;
    color?: typographyColor;
}
