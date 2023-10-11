import {
    AccessTokenInterface,
    RefreshTokenInterface,
} from '@entities/viewer/model/types';

export type RefreshParams = string;

export interface AuthResponse {
    role: 'EXPLORER' | 'KEEPER';
    accessToken: AccessTokenInterface;
    refreshToken: RefreshTokenInterface;
}

export interface LogoutResponse {
    message: string;
}
