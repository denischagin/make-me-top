import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { EditingButtonsProps } from '@features/edit-homework/ui/EditingButtons/interface';

export const EditingButtons =
    ({
         isEditing,
         handleUpdateHomework,
         handleCanselEditing,
         handleStartEditing,
         handleOpenConfirmDelete,
     }: EditingButtonsProps) => {
        return (
            <>
                {isEditing ? (
                    <>
                        <Button
                            title={'Принять'}
                            size={buttonSize.small}
                            color={buttonColor.filled}
                            onClick={handleUpdateHomework}
                        />

                        <Button
                            title={'Отменить'}
                            size={buttonSize.small}
                            color={buttonColor.primary500}
                            onClick={handleCanselEditing}
                        />
                    </>
                ) : (
                    <Button
                        title={'Редактировать'}
                        size={buttonSize.small}
                        onClick={handleStartEditing}
                        color={buttonColor.filled}
                    />
                )}

                <Button
                    title={'Удалить'}
                    size={buttonSize.small}
                    color={buttonColor.black}
                    onClick={handleOpenConfirmDelete}
                />
            </>

        );
    };