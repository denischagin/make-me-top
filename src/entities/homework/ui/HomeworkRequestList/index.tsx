import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { HomeworkRequestListProps } from '@entities/homework/ui/HomeworkRequestList/interface';

export const HomeworkRequestList = ({ children }: HomeworkRequestListProps) => {
    const [block, element] = bem('homework-request-list');

    return (
        <div className={block()}>
            {children}
            <span className={element('dot')} />
        </div>
    );
};