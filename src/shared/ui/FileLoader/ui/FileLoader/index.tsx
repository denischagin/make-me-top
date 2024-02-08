import { bem } from '@shared/utils';
import { FILE_LOADER_BLOCK } from '@shared/ui/FileLoader';
import { createContext, useContext, useState } from 'react';
import { FileLoadDragStatuses, FileLoaderProps, FileLoadType } from './interface';
import { validateFile } from '@shared/ui/FileLoader/libs';

export interface FileLoaderContextInterface {
    dragStatus: FileLoadDragStatuses;
    handleChangeDragStatus: (newStatus: FileLoadDragStatuses) => void;
    handleFileLoad: (file?: File) => void;
    onFileLoad?: (file: File) => void;
    fileTypes: FileLoadType;
}

const FileLoaderContext =
    createContext<FileLoaderContextInterface>({
        dragStatus: 'leave',
        handleChangeDragStatus: () => {
        },
        handleFileLoad: () => {
        },
        onFileLoad: () => {
        },
        fileTypes: '*/*',
    });
export const useFileLoader = () => useContext(FileLoaderContext);

export const FileLoader = (props: FileLoaderProps) => {
    const {
        children,
        className,
        onFileLoad,
        fileTypes,
    } = props;

    const [dragStatus, setDragStatus] = useState<FileLoadDragStatuses>('leave');

    const handleChangeDragStatus = (newStatus: FileLoadDragStatuses) => {
        setDragStatus(newStatus);
    };

    const handleFileLoad = (file?: File) => {
        if (!validateFile(file, fileTypes)) return;

        file && onFileLoad && onFileLoad(file);
    };

    const [block] = bem(FILE_LOADER_BLOCK);

    const providerValue: FileLoaderContextInterface = {
        dragStatus,
        handleChangeDragStatus,
        handleFileLoad,
        onFileLoad,
        fileTypes: fileTypes ?? '*/*',
    };

    return (
        <div className={block(className)}>
            <FileLoaderContext.Provider value={providerValue}>
                {children}
            </FileLoaderContext.Provider>
        </div>
    );
};
