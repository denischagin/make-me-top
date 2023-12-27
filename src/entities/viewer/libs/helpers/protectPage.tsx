import React from 'react';

import { AuthProtect } from '@entities/viewer/libs/providers/AuthProtect';

export const protectPage = (children: JSX.Element) => {
    return <AuthProtect>{children}</AuthProtect>;
};
