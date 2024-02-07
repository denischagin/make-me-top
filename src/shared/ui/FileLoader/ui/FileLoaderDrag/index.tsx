import { bem } from '@shared/utils';
import { FILE_LOADER_BLOCK, useFileLoader } from '@shared/ui/FileLoader';
import { DragEventHandler } from 'react';
import toast from 'react-hot-toast';

export const FileLoaderDrag = () => {
    const [, element] = bem(FILE_LOADER_BLOCK);
    const { handleChangeDragStatus, dragStatus } = useFileLoader();

    const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        handleChangeDragStatus('enter');
    };

    const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        handleChangeDragStatus('leave');
    };

    const handleDrop: DragEventHandler<HTMLDivElement> = async (e) => {
        e.preventDefault();

        handleChangeDragStatus('leave');

        const requiredTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!requiredTypes.includes(e.dataTransfer?.files[0]?.type)) {
            return toast.error('Такой формат фото не поддерживается!');
        }

        console.log(e.dataTransfer?.items);
        console.log(e.dataTransfer?.items[0]);
        console.log(e.dataTransfer?.items[0]?.type);

        console.log('chrome dlya pidorasov');

        console.log(e.dataTransfer?.files);
        console.log(e.dataTransfer?.files[0]);
        console.log(e.dataTransfer?.files[0]?.type);

    };

    const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    return (
        <div
            className={element('drag', {
                hidden: dragStatus !== 'enter',
            })}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            Перетащите файл
        </div>
    );
};