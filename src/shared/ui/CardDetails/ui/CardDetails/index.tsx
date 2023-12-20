import { useState } from 'react';
import { bem } from '@shared/utils';
import { CardDetailsProps, CardDetailsRenderPropArgs } from '@shared/ui/CardDetails/ui/CardDetails/interface';
import './styles.scss';

export const CardDetails = ({ renderSummary, renderContent, className, ...restProps }: CardDetailsProps) => {
    const [block, element] = bem('card-details');
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(prev => !prev);
    };

    const handleActive = () => {
        setIsActive(true);
    };

    const handleInactive = () => {
        setIsActive(false);
    };

    const renderPropArgs: CardDetailsRenderPropArgs = {
        isActive,
        handleActive,
        handleInactive,
        handleToggle,
    };

    return (
        <div className={block(className)} {...restProps}>
            {renderSummary && renderSummary(renderPropArgs)}
            {renderContent && renderContent(renderPropArgs)}
        </div>
    );
};