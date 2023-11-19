import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { HomeworkRequestListProps } from '@entities/homework/ui/HomeworkRequestCardGroup/interface';

export const HomeworkRequestCardGroup = ({ children }: HomeworkRequestListProps) => {
    const [block, element] = bem('homework-request-list');

    return (
        <div className={block()}>
            {children}
            <span className={element('dot')} />
        </div>
    );
};