import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { AvatarCropperProps } from './interface';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { getCroppedImg } from '@features/load-avatar/libs';
import { bem } from '@shared/utils';
import './styles.scss';
import 'react-image-crop/src/ReactCrop.scss';


const AvatarCropper = ({ image, onSave }: AvatarCropperProps) => {
    const [block, element] = bem('avatar-cropper');

    const [crop, setCrop] = useState<Crop>({ unit: 'px', width: 30, height: 30, x: 0, y: 0 });

    const handleCropChange = (newCrop: Crop) => {
        setCrop(newCrop);
    };


    const handleSave = async () => {
        if (!image) return;

        const savedImage = await getCroppedImg(image, crop);

        onSave(savedImage);
    };

    if (!image)
        return null;

    return (
        <div className={block()}>
            <Button
                className={element('button')}
                onClick={handleSave}
                title='Сохранить'
                size={buttonSize.small}
                color={buttonColor.primary500}
            />

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

        </div>
    );
};

export default AvatarCropper;