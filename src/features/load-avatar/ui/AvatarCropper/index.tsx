import React, { useCallback, useState } from 'react';
import { AvatarCropperProps } from './interface';
import './styles.scss';
import Cropper, { Area } from 'react-easy-crop';
import { bem } from '@shared/utils';
import { getCroppedImg } from '@features/load-avatar/libs/';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import toast from 'react-hot-toast';


export const AvatarCropper = ({ image, onSave }: AvatarCropperProps) => {
    const [block, element] = bem('avatar-cropper');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);


    const showCroppedImage = useCallback(async () => {
        try {
            if (!image) return toast.error('Выберите область для аватарки');

            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation,
            );

            const fileExtension = croppedImage.type.split('/')[1];

            const file = new File(
                [croppedImage],
                `avatar.${fileExtension}`,
                {
                    type: croppedImage.type,
                });

            onSave(file);
        } catch (e) {
            toast.error('Возникла ошибка при обработке фото');
        }
    }, [croppedAreaPixels, rotation]);

    const onCropComplete = useCallback(async (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    return (
        <div className={block()}>
            <div className={element('crop-wrapper')}>
                <Cropper
                    image={image ? URL.createObjectURL(image) : undefined}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1}
                    cropShape={'round'}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    zoomSpeed={0.3}
                    zoomWithScroll
                    maxZoom={5}
                />
            </div>

            <Button
                onClick={showCroppedImage}
                title="Сохранить"
                size={buttonSize.small}
                color={buttonColor.primary500}
            />
        </div>
    );
};