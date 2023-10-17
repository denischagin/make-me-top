import { Button } from '@shared/ui/Button';

import { ReactComponent as StarIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/helpers/bem';

import { RequiredSystemsListInterface } from './interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

import './styles.scss';

export const RequiredSystemsList = (props: RequiredSystemsListInterface) => {
    const { systemList = [], handleChangeSystem } = props;

    const [block, element] = bem('required-list');

    return (
        <div className={block()}>
            {systemList.map(({ systemId, systemName }) => (
                <div key={systemId} className={element('item')}>
                    <div className={element('system')}>
                        <StarIcon className={element('system-icon')} />
                        <span className={element('name')}>{systemName}</span>
                    </div>
                    <div className={element('info')}>
                        <div className={element('button')}>
                            <Button
                                size={buttonSize.small}
                                color={buttonColor.filled}
                                title='Перейти'
                                onClick={() =>
                                    handleChangeSystem &&
                                    systemId &&
                                    handleChangeSystem(systemId)
                                }
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
