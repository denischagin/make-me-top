import { Button } from '@shared/ui/Button';
import { ShowUserInfoButtonProps, useShowUserInfo } from '@features/show-user-info/ui';

export const ShowUserInfoButton = (props: ShowUserInfoButtonProps) => {
    const { handleOpenModal } = useShowUserInfo();

    return (
        <Button {...props} onClick={handleOpenModal} />
    );
};