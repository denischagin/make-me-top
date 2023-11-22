import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { useState } from 'react';

export const OldHomeworksRequest = () => {
	const [active, setActive] = useState(false);
	
	return (
		<div>
			<Typography variant={typographyVariant.h2}>
				Предыдущие задания
			</Typography>
			
			<CardGroupDetails
				active={active}
				setActive={setActive}
				summary={
					<>
						<Typography variant={typographyVariant.regular14}>
							Группа: Шалуга, Коммитов, Бэков
						</Typography>
					</>
				}
				content={
					<>
					
					</>
				}
			/>
		</div>
	);
};