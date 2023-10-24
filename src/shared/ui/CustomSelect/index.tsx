import Select from 'react-select';
import { CustomSelectProps } from './interface';
import './style.scss';

export const CustomSelect = (props: CustomSelectProps) => {
    return (
        <Select
            unstyled
            className='custom-select-container'
            classNamePrefix='custom-select'
            noOptionsMessage={() => <>Нет подходящих</>}
            {...props}
        />
    );
};
