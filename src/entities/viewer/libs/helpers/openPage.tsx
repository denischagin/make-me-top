import React from 'react';
import { AuthOpen } from '@entities/viewer/libs/providers/AuthOpen';


export const openPage = (children: JSX.Element) => {
	return <AuthOpen>{children}</AuthOpen>;
};
