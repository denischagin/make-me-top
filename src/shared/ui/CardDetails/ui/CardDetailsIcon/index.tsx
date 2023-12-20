import { ArrowButton } from '@shared/ui/ArrowButton';
import { CardDetailsIconProps } from '@shared/ui/CardDetails/ui/CardDetailsIcon/interface';
import { arrowButtonDirection, arrowButtonVariant } from '@shared/ui/ArrowButton/interfaces';
import { bem } from '@shared/utils';
import './styles.scss';

export const CardDetailsIcon = ({ isActive, className, ...restProps }: CardDetailsIconProps) => {
    const [block, element] = bem('card-details-icon');

    return (
        <div className={block(className)} {...restProps}>
            <ArrowButton
                variant={arrowButtonVariant.simple}
                direction={
                    isActive
                        ? arrowButtonDirection.bottom
                        : arrowButtonDirection.right
                }
            />
        </div>
    );
};