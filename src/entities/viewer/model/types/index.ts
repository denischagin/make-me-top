import { roles } from '@shared/constants/storageKeys';

export interface ViewerState {
    isAuth: boolean;
    currentRole: roles;
    accessToken: string | null;
    refreshToken: string | null;
}

export interface RefreshResponse {
    role: 'EXPLORER' | 'KEEPER';
    accessToken: string;
    refreshToken: string;
}
