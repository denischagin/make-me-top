import { bem } from '@shared/utils/helpers/bem';

import { ModalAlertInterface } from './interfaces';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';

import './styles.scss';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { RequiredSystemsList } from '@shared/ui/RequiredSystemsList';
import { useNavigate } from 'react-router-dom';

export const ModalAlert = (props: ModalAlertInterface) => {
	const {
		dependencies,
		title,
		handleChangeSystem,
		isExplorer,
		onClickShow
	} = props;
	
	const [block, element] = bem('modal-alert');
	
	return (
		<>
			{title && title !== ModalAccessStatus.opened && isExplorer && (
				<div className={block()}>
					<div className={element('title')}>
						{title}
						{
							title === ModalAccessStatus.studied_systemAlreadyDone &&
						  <Button
							title={'Посмотреть'}
							size={buttonSize.small}
							color={buttonColor.filled}
							onClick={onClickShow}
						  />
						}
					</div>
					{dependencies?.length !== 0 && (
						<RequiredSystemsList
							systemList={dependencies}
							handleChangeSystem={handleChangeSystem}
						/>
					)}
				</div>
			)}
		</>
	);
};
