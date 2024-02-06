import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { LoadAvatarImageProps } from '@features/load-avatar/ui/LoadAvatarImage/interface';
import { Menu, MenuButton, MenuContent, MenuItem } from '@shared/ui/Menu';
import React, { useState } from 'react';
import { Modal } from '@shared/ui/Modal';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { FileInput } from '@shared/ui/FileInput';

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
                    <Avatar
                        size={avatarSize.large}
                        {...props}
                    />
                </MenuButton>

                <MenuContent>
                    <MenuItem onClick={handleOpenAddPhoto}>Добавить фото</MenuItem>
                    <MenuItem onClick={handleOpenDelete}>Удалить фото</MenuItem>
                </MenuContent>
            </Menu>

            <Modal onClose={handleCloseAddPhoto} isOpen={isOpenAddPhoto}>
                <FileInput />
            </Modal>

            <ConfirmModal
                confirmTitle={'Вы уведерены, что хотите удалить фото?'}
                rejectButtonTitle={'Нет, хочу оставить'}
                submitButtonTitle={'Да, хочу удалить'}
                onSubmit={handleDeleteAvatar}
                onClose={handleCloseDelete}
                isOpen={isOpenDelete}
            />
        </>
    );
};