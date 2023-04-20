import { useEffect } from "react";
import { createPortal } from "react-dom";

import { PortalInterface } from "./interfaces";

export const Portal = (props: PortalInterface) => {
  const mount = document.getElementById(`${props.target}`);
  const el = document.createElement("div");

  useEffect(() => {
    mount?.appendChild(el);

    return () => {
      mount?.removeChild(el);
    };
  }, [el, mount]);

  return createPortal(props.children, el);
};
