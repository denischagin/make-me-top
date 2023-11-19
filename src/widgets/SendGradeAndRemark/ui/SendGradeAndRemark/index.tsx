import { bem } from '@shared/utils/helpers/bem';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import React, { useState } from 'react';
import './styles.scss';
import { SendRemark } from '@widgets/SendGradeAndRemark/ui/SendRemark';
import { SetSendGrade } from '@widgets/SendGradeAndRemark/ui/SetSendGrade';

export const SendGradeAndRemark = () => {
    const [block, element] = bem('send-grade-remark');
    const [isShowRemarkWidget, setIsShowRemarkWidget] = useState(true);

    return (
        <div className={block()}>
            {isShowRemarkWidget ? <SendRemark /> : <SetSendGrade />}

            <Button
                title={isShowRemarkWidget ? 'Поставить оценку' : 'Написать замечание'}
                size={buttonSize.small}
                color={isShowRemarkWidget ? undefined : buttonColor.filled}
                onClick={() => setIsShowRemarkWidget(prev => !prev)}
                className={element('button-switch-grade')}
            />
        </div>
    );
};