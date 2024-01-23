import { bem } from '@shared/utils';
import { CircleBadgeProps } from '@shared/ui/CircleBadge/interface';
import './styles.scss';

export const CircleBadge = (props: CircleBadgeProps) => {
    const [block, element] = bem('circle-badge');

    const { emptyContent, children } = props;

    return (
        <div className={block()}>
            {emptyContent && (
                props.showBadge === true && <span className={element('badge')} />
            )}

            {!emptyContent && (
                !(props.badgeContent === 0 && !props.showZero) && (
                    <span className={element('badge')}>
                        {props.badgeContent}
                    </span>
                )
            )}

            <div className={element('children')}>
                {children}
            </div>
        </div>
    );
};