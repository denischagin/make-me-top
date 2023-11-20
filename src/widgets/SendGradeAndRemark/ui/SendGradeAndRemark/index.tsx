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
	
	const handleSwitchWidget = () => {
		setIsShowRemarkWidget(prev => !prev);
	};
	
	return (
		<div className={block()}>
			{
				isShowRemarkWidget
					? <SendRemark onSwitchClick={handleSwitchWidget} />
					: <SetSendGrade onSwitchClick={handleSwitchWidget} />
			}
		</div>
	);
};