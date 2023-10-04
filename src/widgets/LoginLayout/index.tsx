import { BackgroundHome } from '@shared/ui/BackgroundHome';

import { ReactComponent as MakeMeTopIcon } from '@shared/images/make-me-top.svg';

import { bem } from '@shared/utils/helpers/bem';

import { LoginSelectRoleLayoutProps } from '@widgets/LoginLayout/interface';

import './styles.scss';

const LoginLayout = ({
    children,
    isRoleSelected = false,
}: LoginSelectRoleLayoutProps) => {
    const [block, element] = bem('login-select-role-layout');

    return (
        <>
            <BackgroundHome />
            <div className={block()}>
                <div
                    className={element('planet', {
                        isRoleSelected,
                    })}
                />
                <div className={element('fields')}>
                    <p className={element('heading')}>
                        <MakeMeTopIcon />
                    </p>

                    {children}
                </div>
            </div>
        </>
    );
};

export default LoginLayout;
