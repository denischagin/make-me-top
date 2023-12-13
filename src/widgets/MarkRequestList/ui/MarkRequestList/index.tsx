import { bem, getUserFullName } from '@shared/utils';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { CardWithExtraButton } from '@shared/ui/CardWithExtraButton';
import { MarkRequestListProps } from '@widgets/MarkRequestList/ui/MarkRequestList/interface';
import { MarkRequestItem } from '@widgets/MarkRequestList';
import { useState } from 'react';
import './styles.scss';

export const MarkRequestList = ({ markRequestList }: MarkRequestListProps) => {
    const [block, element] = bem('mark-request-list');

    const [selectedExplorerId, setSelectedExplorerId] = useState<number | null>(null);
    const [selectedMark, setSelectedMark] = useState<number | null>(null);

    const handleSelectMark = (mark: number | null) => {
        setSelectedMark(mark);
    };

    const handleSelectExplorer = (explorerId: number | null) => {
        setSelectedExplorerId(explorerId);
    };

    if (!markRequestList.length) return null;

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mb-4')}
                variant={typographyVariant.h2}
            >
                Итоговая оценка
            </Typography>

            <div className={element('cards')}>
                {markRequestList?.map((markRequest) => (
                    <MarkRequestItem
                        key={markRequest.personId}
                        currentMark={selectedMark}
                        currentExplorerId={selectedExplorerId}
                        handleChangeMark={handleSelectMark}
                        handleChangeExplorer={handleSelectExplorer}
                        {...markRequest}
                    />
                ))}
            </div>

        </div>
    );
};