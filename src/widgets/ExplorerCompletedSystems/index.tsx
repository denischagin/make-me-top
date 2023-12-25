import { SystemsList } from '@widgets/SystemsList';
import { bem } from '@shared/utils/helpers/bem';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { useNavigate } from 'react-router-dom';
import CircleModalWithGalaxy from '@entities/galaxy/ui/CircleModalWithGalaxy';
import { closeModal, showModal } from '@entities/user/model/slice';
import { useSelector } from 'react-redux';
import { userIsModalOpenSelector } from '@entities/user/model/selectors';
import { useAppDispatch } from '@app/providers/store/hooks';
import { useState } from 'react';
import { useAuth } from '@entities/viewer';

export const ExplorerCompletedSystems = () => {
    const [, element] = bem('explorer');
    const [selectedSystemId, setSelectedSystemId] = useState<null | number>(null);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const isModalOpen = useSelector(userIsModalOpenSelector);


    const {
        data: userInfo,
    } = useGetExplorerProfileQuery();

    const handleSystemClick = (systemId: number) => {
        dispatch(showModal());
        setSelectedSystemId(systemId);
    };

    const handleCloseModal = () => {
        setSelectedSystemId(null);
        dispatch(closeModal());
    };

    return (
        <>
            <div className={element('completed-systems')}>
                <SystemsList
                    heading='Освоенные системы'
                    systems={userInfo?.investigatedSystems ?? []}
                    onSystemClick={handleSystemClick}
                />
            </div>

            {selectedSystemId && (
                <CircleModalWithGalaxy
                    handleClose={handleCloseModal}
                    isOpen={isModalOpen}
                    currentSystemId={selectedSystemId}
                />
            )}
        </>
    );
};