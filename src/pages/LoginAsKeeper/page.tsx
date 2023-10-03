import { Login } from '@widgets/Login';
import LoginLayout from '@widgets/LoginLayout';

const LoginAsExplorer = () => {
    return (
        <LoginLayout isRoleSelected>
            <Login role='KEEPER' />
        </LoginLayout>
    );
};

export default LoginAsExplorer;
