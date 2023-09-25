import { createPortal } from 'react-dom';

import { PortalInterface } from './interfaces';

export const Portal = (props: PortalInterface) => {
    const {
        children,
        target,
    } = props;

    return createPortal(children, target);
};
