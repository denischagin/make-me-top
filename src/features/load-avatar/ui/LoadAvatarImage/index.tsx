import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { LoadAvatarImageProps } from './interface';
import { Menu, MenuButton, MenuContent, MenuItem } from '@shared/ui/Menu';
import React, { useState } from 'react';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import LoadAvatarModal from '@features/load-avatar/ui/LoadAvatarModal';
import { useDeleteAvatarMutation } from '@entities/avatar';


export const LoadAvatarImage = (props: LoadAvatarImageProps) => {
    const [isOpenAddPhoto, setIsOpenAddPhoto] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [avatarHash, setAvatarHash] = useState(() => `${new Date().getTime()}`);

    const [deleteAvatar] = useDeleteAvatarMutation();

    const handleSuccessDeleteAvatar = () => {
        handleChangeAvatarHash();
    };

    const handleChangeAvatarHash = () => {
        setAvatarHash(`${new Date().getTime()}`);
    };
    const handleOpenAddPhoto = () => {
        setIsOpenAddPhoto(true);
    };

    const handleCloseAddPhoto = () => {
        setIsOpenAddPhoto(false);
    };

    const handleDeleteAvatar = () => {
        deleteAvatar()
            .unwrap()
            .then(handleSuccessDeleteAvatar)
            .catch(() => {
            });
        handleCloseDelete();
    };

    const handleCloseDelete = () => {
        setIsOpenDelete(false);
    };

    const handleOpenDelete = () => {
        setIsOpenDelete(true);
    };

    return (
        <>
            <Menu>
                <MenuButton>
                    <Avatar size={avatarSize.large} {...props} type='NORMAL' hash={avatarHash} />
                </MenuButton>

                <MenuContent>
                    <MenuItem onClick={handleOpenAddPhoto}>Добавить фото</MenuItem>
                    <MenuItem onClick={handleOpenDelete}>Удалить фото</MenuItem>
                </MenuContent>
            </Menu>

            <LoadAvatarModal
                isOpen={isOpenAddPhoto}
                onClose={handleCloseAddPhoto}
                onChangeAvatarHash={handleChangeAvatarHash}
            />

            <ConfirmModal
                confirmTitle={'Вы уверены, что хотите удалить фото?'}
                rejectButtonTitle={'Нет, хочу оставить'}
                submitButtonTitle={'Да, хочу удалить'}
                onSubmit={handleDeleteAvatar}
                onClose={handleCloseDelete}
                isOpen={isOpenDelete}
            />
        </>
    );
};