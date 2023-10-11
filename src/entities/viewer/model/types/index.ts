import { roles } from '@shared/constants/storageKeys';

export interface ViewerState {
    isAuth: boolean;
    currentRole: roles;
    accessToken: string | null;
    refreshToken: string | null;
}

export interface RefreshTokenInterface {
    refreshToken: string;
    expirationTime: string;
}

export interface AccessTokenInterface {
    accessToken: string;
    expirationTime: string;
}
