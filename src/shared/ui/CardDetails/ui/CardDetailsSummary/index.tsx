import { CardDetailsSummaryProps } from '@shared/ui/CardDetails/ui/CardDetailsSummary/interface';
import { bem } from '@shared/utils';
import './styles.scss';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';

export const CardDetailsSummary = (props: CardDetailsSummaryProps) => {
    const {
        isActive,
        cardProps,
        className,
        children,
        ...restProps
    } = props;
    const [block, element] = bem('card-details-summary');

    return (
        <div className={block({
            active: isActive,
        })} {...restProps}>
            <Card
                {...cardProps}
                size={cardProps?.size ?? cardSize.large}
            >
                <div
                    className={className}
                >
                    {children}
                </div>
            </Card>
        </div>
    );
};