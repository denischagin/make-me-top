import { ComponentProps } from 'react';

export interface FileLoaderProps extends ComponentProps<'div'> {
    onFileLoad?: (file: File) => void;
    fileTypes?: FileLoadType;

}

export type FileLoadDragStatuses = 'enter' | 'leave'

export type FileLoadType = string[] | '*/*'