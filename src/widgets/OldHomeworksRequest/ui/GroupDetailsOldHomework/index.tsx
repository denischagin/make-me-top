import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { useState } from 'react';

export const GroupDetailsOldHomework = () => {
	const [active, setActive] = useState(false);
	
	return (
		<CardGroupDetails
			active={active}
			setActive={setActive}
			summary={
				<div>
					<Typography variant={typographyVariant.h2}>
						Шалуга, Коммитов, Бэков
					</Typography>
					<Typography variant={typographyVariant.regular16}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
						dignissimos
						doloremque est exercitationem fuga modi omnis praesentium, quas repellat reprehenderit!
						Deserunt fugiat id illum nulla quo, vel.
					</Typography>
				</div>
			}
			content={
				<div>
					<Card size={cardSize.small}>
						<Typography variant={typographyVariant.h2}>
							Чел обычный просто
						</Typography>
						
						<Typography variant={typographyVariant.regular14}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						</Typography>
					</Card>
					
					<Card size={cardSize.small}>
						<Typography variant={typographyVariant.h2}>
							Чел обычный просто
						</Typography>
						
						<Typography variant={typographyVariant.regular14}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						</Typography>
					</Card>
				</div>
			}
		/>
	);
};