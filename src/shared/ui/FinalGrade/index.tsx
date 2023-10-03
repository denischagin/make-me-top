import { ReactComponent as LockIcon } from '@shared/images/lock.svg';
import { ReactComponent as StarIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/helpers/bem';

import { GRADES } from './model';

import './styles.scss';

export const FinalGrade = () => {
    const [block, element] = bem('final-grade');

    return (
        <div className={block()}>
            <span className={element('text')}>Итоговая оценка</span>
            <div className={element('systems')}>
                <span>
                    {GRADES.map((system) => (
                        <StarIcon
                            key={system.grade}
                            className={element('system-icon')}
                        />
                    ))}
                </span>
                <span>{<LockIcon className={element('lock-icon')} />}</span>
            </div>
        </div>
    );
};
