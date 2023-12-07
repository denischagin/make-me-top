import { ChangeEventHandler } from 'react';

export interface EditingContentProps {
    isEditing: boolean,
    editValue: string,
    content: string,
    handleChangeEditField: ChangeEventHandler<HTMLTextAreaElement>
}

