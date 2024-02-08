import React, { useEffect, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { AvatarCropperProps } from './interface';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { getCroppedImg } from '@features/load-avatar/libs';
import { bem } from '@shared/utils';
import './styles.scss';
import 'react-image-crop/src/ReactCrop.scss';
import toast from 'react-hot-toast';


const AvatarCropper = ({ image, onSave }: AvatarCropperProps) => {
    const [block, element] = bem('avatar-cropper');

    const cropInit = { unit: 'px', width: 50, height: 50, x: 0, y: 0 } as Crop;

    const [crop, setCrop] = useState<Crop>(cropInit);

    const handleCropChange = (newCrop: Crop) => {
        setCrop(newCrop);
    };

    useEffect(() => {
        setCrop(cropInit);
    }, [image]);


    const handleSave = async () => {
        if (!image) return;
        if (crop.width === 0 || crop.height === 0) return toast.error('Выберите область');

        const savedImage = await getCroppedImg(image, crop);

        const file = new File([savedImage], `avatar.${savedImage.type.split('/')[1]}`, { type: savedImage.type });

        onSave(file);
    };

    if (!image)
        return null;

    return (
        <div className={block()}>
            <div className={element('crop-container')}>
                <ReactCrop
                    crop={crop}
                    onChange={handleCropChange}
                    circularCrop
                    aspect={1}
                    className={element('crop')}
                >
                    <img
                        src={URL.createObjectURL(image)}
                        alt='crop avatar'
                    />
                </ReactCrop>
            </div>

            <Button
                className={element('button')}
                onClick={handleSave}
                title='Сохранить'
                size={buttonSize.small}
                color={buttonColor.primary500}
            />
        </div>
    );
};

export default AvatarCropper;