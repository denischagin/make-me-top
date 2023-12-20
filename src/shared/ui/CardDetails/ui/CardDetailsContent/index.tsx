import { bem } from '@shared/utils';
import { CardDetailsContentProps } from '@shared/ui/CardDetails/ui/CardDetailsContent/interface';
import './styles.scss';

export const CardDetailsContent = ({ isActive, className, ...restProps }: CardDetailsContentProps) => {
    const [block, element] = bem('card-details-content');

    return (
        <>
            {
                isActive && (
                    <div
                        className={
                            block({
                                active: isActive,
                            }, className)}
                        {...restProps}
                    />
                )

            }
        </>
    );
};