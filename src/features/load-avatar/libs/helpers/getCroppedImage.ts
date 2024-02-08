import { Crop } from 'react-image-crop';

export const getCroppedImg = (imageFile: File, pixelCrop: Crop): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const imageElement = new Image();
        imageElement.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.drawImage(
                    imageElement,
                    pixelCrop.x,
                    pixelCrop.y,
                    pixelCrop.width,
                    pixelCrop.height,
                    0,
                    0,
                    pixelCrop.width,
                    pixelCrop.height,
                );

                canvas.toBlob(file => {
                    if (!file) {
                        reject('Failed to crop the image.');
                    } else {
                        resolve(file);
                    }
                }, imageFile.type);
            }
        };

        imageElement.src = URL.createObjectURL(imageFile);
    });
};