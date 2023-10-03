import { Login } from '@widgets/Login';
import LoginLayout from '@widgets/LoginLayout';
import React from 'react';

const LoginAsExplorer = () => {
    return (
        <LoginLayout isRoleSelected>
            <Login role='EXPLORER' />
        </LoginLayout>
    );
};

export default LoginAsExplorer;
