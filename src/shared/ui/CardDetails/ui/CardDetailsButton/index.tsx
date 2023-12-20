import { Button } from '@shared/ui/Button';
import { CardDetailsButtonProps } from '@shared/ui/CardDetails/ui/CardDetailsButton/interface';

export const CardDetailsButton = ({ isActive, activeTitle, inactiveTitle, ...restProps }: CardDetailsButtonProps) => {
    return (
        <Button title={isActive ? activeTitle : inactiveTitle} {...restProps} />
    );
};