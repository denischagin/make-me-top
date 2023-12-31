import { bem } from '@shared/utils/helpers/bem';

import { AvatarInterface } from './interfaces';

import './styles.scss';

export const Avatar = (props: AvatarInterface) => {
	const {
		size,
		orbit,
		isActive,
		image = 'https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg',
	} = props;
	
	const [block, element] = bem('avatar');
	
	return (
		<div
			className={block({
				size,
			})}
		>
			{orbit && (
				<div className={element('border', {
					size,
				})}>
					<div className={element('orbit', 'mt-5')} />
				</div>
			)}
			<img
				src={image}
				alt=""
				className={element('image', {
					size,
					active: isActive
				})}
			/>
		</div>
	);
};
