import { Modal } from '@shared/ui/Modal';
import { modalPosition } from '@shared/ui/Modal/interface';
import { FileLoader, FileLoaderDrag, FileLoaderInput } from '@shared/ui/FileLoader';
import { DividingLine } from '@shared/ui/DividingLine';
import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import AvatarCropper from '@features/load-avatar/ui/AvatarCropper';
import { useState } from 'react';
import { LoadAvatarModalProps } from './interface';


const LoadAvatarModal = ({ isOpen, onClose }: LoadAvatarModalProps) => {
    const [currentAvatar, setCurrentAvatar] = useState<File | null>(null);

    const handleFileLoad = (file: File) => {
        setCurrentAvatar(file);
    };

    const handleSaveFile = (file: Blob) => {
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} position={modalPosition.center} closeOnBackground={false}>
            <FileLoader onFileLoad={handleFileLoad} fileTypes={['image/jpeg', 'image/png', 'image/jpg']}>
                <FileLoaderDrag>Перетащите сюда файл</FileLoaderDrag>

                <FileLoaderInput>Загрузить файл</FileLoaderInput>
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
