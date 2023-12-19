import { Button } from '@shared/ui/Button';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { useLeaveCourseByExplorerIdMutation } from '@entities/course';
import { ExpelButtonProps } from '@features/expel';
import { useStatus } from '@shared/utils/hooks/use-status';
import toast from 'react-hot-toast';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { useState } from 'react';

export const ExpelButton = ({ explorerId }: ExpelButtonProps) => {
    const [expelExplorer, { isSuccess }] = useLeaveCourseByExplorerIdMutation();
    const [isOpenConfirmExpel, setIsOpenConfirmExpel] = useState(false);
    const handleExpelExplorerClick = () => {
        expelExplorer(explorerId);
    };

    useStatus(() => {
        toast('Вы потеряли члена экипажа', {
            icon: '😔',
        });
    }, isSuccess);

    return (
        <>
            <Button title={'Отчислить'} size={buttonSize.small} onClick={() => setIsOpenConfirmExpel(true)} />

            <ConfirmModal
                confirmTitle={'Вы уверены что хотите отчислить этого исследователя?'}
                rejectButtonTitle={'Нет'}
                submitButtonTitle={'Да, я хочу отчислить'}
                onSubmit={handleExpelExplorerClick}
                onClose={() => setIsOpenConfirmExpel(false)}
                isOpen={isOpenConfirmExpel}
            />
        </>
    );
};