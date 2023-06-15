import { ReactComponent as CloseIcon } from "@shared/images/close.svg";

import { Portal } from "@shared/Portal";

import { bem } from "@shared/utils/bem";

import { ReviewModalInterface } from "@shared/types/common";

import "./styles.scss";

export const Modal = (props: ReviewModalInterface) => {
  const {
    children,
    onClose,
  } = props;

  const [block, element] = bem("modal");

  return (
    <Portal target={document.body}>
      <div className={block()}>
        <div className={element("content")}>
          <CloseIcon
            className={element("close-icon")}
            onClick={onClose}
          />
          {children}
        </div>
      </div>
    </Portal>
  );
};
