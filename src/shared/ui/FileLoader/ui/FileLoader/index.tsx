import { bem } from '@shared/utils';
import { FILE_LOADER_BLOCK } from '@shared/ui/FileLoader';
import { createContext, useContext, useState } from 'react';
import { FileLoadDragStatuses, FileLoaderProps } from './interface';

export interface FileLoaderContextInterface {
    dragStatus: FileLoadDragStatuses;
    handleChangeDragStatus: (newStatus: FileLoadDragStatuses) => void;
}

const FileLoaderContext =
    createContext<FileLoaderContextInterface>({
        dragStatus: 'leave', handleChangeDragStatus: () => {
        },
    });
export const useFileLoader = () => useContext(FileLoaderContext);

export const FileLoader = (props: FileLoaderProps) => {
    const { children, className } = props;

    const [dragStatus, setDragStatus] = useState<FileLoadDragStatuses>('leave');

    const handleChangeDragStatus = (newStatus: FileLoadDragStatuses) => {
        setDragStatus(newStatus);
    };

    const [block] = bem(FILE_LOADER_BLOCK);

    return (
        <div className={block(className)}>
            <FileLoaderContext.Provider value={{ dragStatus, handleChangeDragStatus }}>
                {children}
            </FileLoaderContext.Provider>
        </div>
    );
};
