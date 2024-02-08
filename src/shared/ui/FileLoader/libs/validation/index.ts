import toast from 'react-hot-toast';
import { FileLoadType } from '@shared/ui/FileLoader/ui/FileLoader/interface';

export const validateFile = (file?: File, requiredTypes?: FileLoadType) => {
    if (!file) {
        toast.error('Не удалось загрузить файл');
        return false;
    }

    if (requiredTypes !== '*/*' && requiredTypes?.length && !requiredTypes.includes(file.type)) {
        toast.error('Такой формат файла не поддерживается!');
        return false;
    }

    return true;
};
