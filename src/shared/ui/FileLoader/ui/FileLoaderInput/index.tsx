import { bem } from '@shared/utils';
import '../styles.scss';
import { FileLoaderInputProps } from './interface';
import { FILE_LOADER_BLOCK, useFileLoader } from '@shared/ui/FileLoader';
import { ChangeEventHandler } from 'react';

export const FileLoaderInput = (props: FileLoaderInputProps) => {
    const { className, children, ...restProps } = props;
    const [, element] = bem(FILE_LOADER_BLOCK);

    const { dragStatus, handleFileLoad, fileTypes } = useFileLoader();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];

        handleFileLoad(file);
    };

    if (dragStatus !== 'leave') return null;

    return (
        <label className={element('label', className)} {...restProps}>
            {children}

            <input
                className={element('input')}
                type='file'
                onChange={handleChange}
                accept={fileTypes === '*/*' ? fileTypes : fileTypes.join(',')}
            />
        </label>
    );
};