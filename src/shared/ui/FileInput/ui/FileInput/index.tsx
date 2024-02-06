import { bem } from '@shared/utils';
import '../styles.scss';
import { FileInputProps } from './interface';

export const FileInput = (props: FileInputProps) => {
    const { className, ...restProps } = props;
    const [block, element] = bem('file-upload');

    return (
        <label className={block(className)} {...restProps}>
            Загрузите или перетащите файл

            <input className={element('input')} type='file' />
        </label>
    );
};