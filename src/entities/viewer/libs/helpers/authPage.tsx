import { AuthRedirect } from '@entities/viewer/libs/providers/AuthRedirect';
import { ReactNode } from 'react';

export const authPage = (children: JSX.Element) => {
    return <AuthRedirect>{children}</AuthRedirect>;
};
