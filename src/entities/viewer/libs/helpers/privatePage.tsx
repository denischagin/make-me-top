import React from 'react';

import { AuthProtect } from '@entities/viewer/libs/providers/AuthProtect';

export const privatePage = (children: JSX.Element) => {
    return <AuthProtect>{children}</AuthProtect>;
};
