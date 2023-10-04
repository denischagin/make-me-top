import React from 'react';

import { Login } from '@widgets/Login';
import LoginLayout from '@widgets/LoginLayout';

const LoginAsExplorer = () => {
    return (
        <LoginLayout isRoleSelected>
            <Login role='EXPLORER' />
        </LoginLayout>
    );
};

export default LoginAsExplorer;
