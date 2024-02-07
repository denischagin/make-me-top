import { bem } from '@shared/utils';
import '../styles.scss';
import { FileLoaderInputProps } from './interface';
import { FILE_LOADER_BLOCK, useFileLoader } from '@shared/ui/FileLoader';

export const FileLoaderInput = (props: FileLoaderInputProps) => {
    const { className, ...restProps } = props;
    const [block, element] = bem(FILE_LOADER_BLOCK);

    const { dragStatus } = useFileLoader();

    if (dragStatus !== 'leave') return null;

    return (
        <label className={element('label', className)} {...restProps}>
            Загрузите или перетащите файл

            <input className={element('input')} type='file' />
        </label>
    );
};