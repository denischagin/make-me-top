import { Modal } from '@shared/ui/Modal';
import { modalPosition } from '@shared/ui/Modal/interface';
import { FileLoader, FileLoaderDrag, FileLoaderInput } from '@shared/ui/FileLoader';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { AvatarCropper } from '@features/load-avatar';
import { useState } from 'react';
import { LoadAvatarModalProps } from './interface';
import { useSetAvatarMutation } from '@entities/avatar';
import { FileLoaderClipboard } from '@shared/ui/FileLoader/ui/FileLoaderClipboard';


const LoadAvatarModal = ({ isOpen, onClose, onChangeAvatarHash }: LoadAvatarModalProps) => {
    const [currentAvatar, setCurrentAvatar] = useState<File | null>(null);

    const [setAvatarMutation] = useSetAvatarMutation();

    const handleFileLoad = (file: File) => {
        setCurrentAvatar(file);
    };

    const handleSuccessSaveFile = () => {
        onChangeAvatarHash();
    };

    const handleSaveFile = (file: File) => {
        const formData = new FormData();

        formData.append('file', file);

        setAvatarMutation(formData)
            .unwrap()
            .then(handleSuccessSaveFile)
            .catch(() => {
            });

        onClose();
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} position={modalPosition.center} closeOnBackground={false}>
            <FileLoader onFileLoad={handleFileLoad} fileTypes={['image/jpeg', 'image/png', 'image/jpg']}>
                <FileLoaderDrag>Перетащите сюда файл</FileLoaderDrag>

                <FileLoaderInput>Загрузить файл</FileLoaderInput>

                <FileLoaderClipboard />
            </FileLoader>

            {currentAvatar && (
                <>
                    <DividingLine color={DividingLineColor.gray500} />

                    <AvatarCropper image={currentAvatar} onSave={handleSaveFile} />
                </>
            )}
        </Modal>
    );
};

export default LoadAvatarModal;
