import { ChangeEventHandler } from 'react';

export interface EditingContentProps {
    isEditing: boolean,
    editContent: string,
    editTitle: string
    title: string
    content: string,
    handleChangeContentField: ChangeEventHandler<HTMLTextAreaElement>
    handleChangeTitleField: ChangeEventHandler<HTMLInputElement>
}

