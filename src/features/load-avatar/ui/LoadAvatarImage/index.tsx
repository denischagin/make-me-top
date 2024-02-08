import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { LoadAvatarImageProps } from './interface';
import { Menu, MenuButton, MenuContent, MenuItem } from '@shared/ui/Menu';
import React, { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import LoadAvatarModal from '@features/load-avatar/ui/LoadAvatarModal';


export const LoadAvatarImage = (props: LoadAvatarImageProps) => {
    const [isOpenAddPhoto, setIsOpenAddPhoto] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const handleOpenAddPhoto = () => {
        setIsOpenAddPhoto(true);
    };

    const handleCloseAddPhoto = () => {
        setIsOpenAddPhoto(false);
    };

    const handleDeleteAvatar = () => {
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
                    <Avatar size={avatarSize.large} {...props} />
                </MenuButton>

                <MenuContent>
                    <MenuItem onClick={handleOpenAddPhoto}>Добавить фото</MenuItem>
                    <MenuItem onClick={handleOpenDelete}>Удалить фото</MenuItem>
                </MenuContent>
            </Menu>

            <LoadAvatarModal
                isOpen={isOpenAddPhoto}
                onClose={handleCloseAddPhoto}
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