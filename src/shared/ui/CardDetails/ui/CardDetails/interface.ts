import { ComponentProps, ReactElement } from 'react';

export interface CardDetailsRenderPropArgs {
    isActive: boolean;
    handleToggle: () => void;
    handleActive: () => void;
    handleInactive: () => void;
}

export interface CardDetailsProps extends Omit<ComponentProps<'div'>, 'children'> {
    renderSummary?: (args: CardDetailsRenderPropArgs) => ReactElement;
    renderContent?: (args: CardDetailsRenderPropArgs) => ReactElement;
}