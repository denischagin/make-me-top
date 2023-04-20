import { createPortal } from "react-dom";

import { PortalInterface } from "./interfaces";

export const Portal = ({ children, target }: PortalInterface) => {

  return createPortal(children, target);
};
