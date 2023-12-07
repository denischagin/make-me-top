import { bem } from '@shared/utils';
import { CircleBadgeProps } from '@shared/ui/CircleBadge/interface';
import './styles.scss';

export const CircleBadge = ({ badgeContent, children, emptyContent }: CircleBadgeProps) => {
    const [block, element] = bem('circle-badge');

    return (
        <div className={block()}>
            {
                (!!badgeContent || emptyContent) && (
                    <span className={element('badge')}>
                        {!emptyContent && badgeContent}
                    </span>
                )
            }

            <div className={element('children')}>
                {children}
            </div>
        </div>
    );
};