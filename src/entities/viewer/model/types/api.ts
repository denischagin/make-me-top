import {
    AccessTokenInterface,
    RefreshTokenInterface,
} from '@entities/viewer/model/types';
import { roles } from '@shared/constants/storageKeys';

export type RefreshParams = string;

export interface AuthResponse {
    role: 'EXPLORER' | 'KEEPER';
    accessToken: AccessTokenInterface;
    refreshToken: RefreshTokenInterface;
}

export interface AuthCredentials {
    login: string;
    password: string;
    role: roles 
}

export interface LogoutResponse {
    message: string;
}
