import { bem } from '@shared/utils';
import { FILE_LOADER_BLOCK, useFileLoader } from '@shared/ui/FileLoader';
import { DragEventHandler } from 'react';
import { FileLoaderDragProps } from './interface';

export const FileLoaderDrag = (props: FileLoaderDragProps) => {
    const { className, children, ...restProps } = props;

    const [, element] = bem(FILE_LOADER_BLOCK);
    const { handleChangeDragStatus, dragStatus, handleFileLoad } = useFileLoader();

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

        handleFileLoad(e.dataTransfer.files[0]);
    };

    const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    };

    return (
        <div
            {...restProps}
            className={element('drag', {
                hidden: dragStatus !== 'enter',
            }, className)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children}
        </div>
    );
};