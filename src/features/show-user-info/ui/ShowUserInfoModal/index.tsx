import { ShowUserInfoModalProps } from '@features/show-user-info/ui/ShowUserInfoModal/interface';
import { Modal } from '@shared/ui/Modal';
import { bem } from '@shared/utils';
import { useShowUserInfo } from '@features/show-user-info';
import { stackSpacing } from '@shared/ui/Stack/interface';
import { Stack } from '@shared/ui/Stack';
import { Typography } from '@shared/ui/Typography';
import { typographyColor } from '@shared/ui/Typography/interfaces';

import { ReactComponent as EmailIcon } from '@shared/images/email-icon.svg';
import { ReactComponent as TelegramIcon } from '@shared/images/telegram-icon.svg';
import { ReactComponent as SkypeIcon } from '@shared/images/skype-icon.svg';
import { ReactComponent as PhoneIcon } from '@shared/images/phone-icon.svg';
import { ShowUserInfoItem } from '@features/show-user-info/ui/ShowUserInfoItem';
import { SHOW_USER_INFO_BLOCK } from '@features/show-user-info/constants';
import { ShowUserInfoItemProps } from '@features/show-user-info/ui/ShowUserInfoItem/interface';

export const ShowUserInfoModal = (props: ShowUserInfoModalProps) => {
    const { fullwidth } = props;
    const [blockModalInfo, elementModalInfo] = bem(SHOW_USER_INFO_BLOCK);

    const {
        handleCloseModal,
        isOpenModal,
        phoneNumber,
        telegram,
        skype,
        email,
        fullname,
    } = useShowUserInfo();

    const userInfoItems: ShowUserInfoItemProps[] = [
        {
            text: phoneNumber,
            href: `tel:${phoneNumber}`,
            renderIcon: (className) => <PhoneIcon className={className} />,
        },
        {
            text: email,
            href: `mailto:${email}`,
            renderIcon: (className) => <EmailIcon className={className} />,
        },
        {
            text: telegram,
            href: `https://t.me/${telegram}`,
            renderIcon: (className) => <TelegramIcon className={className} />,
        },
        {
            text: skype,
            href: `skype:${skype}?chat`,
            renderIcon: (className) => <SkypeIcon className={className} />,
        },
    ];

    return (
        <Modal onClose={handleCloseModal!} isOpen={isOpenModal!} fullwidth={fullwidth}>
            <Stack spacing={stackSpacing.large}>
                <Typography as='h2' color={typographyColor.black}>{fullname}</Typography>

                <div className={blockModalInfo()}>
                    {userInfoItems.map((itemProps) => (
                        <ShowUserInfoItem
                            key={itemProps.href}
                            {...itemProps}
                            href={itemProps.text ? itemProps.href : undefined}
                        />
                    ))}
                </div>
            </Stack>

        </Modal>
    );
};

