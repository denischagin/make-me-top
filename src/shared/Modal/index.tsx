import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { Portal } from "@shared/Portal";
import { Typography } from "@shared/Typography";
import { ReactComponent as CloseIcon } from "@shared/images/close.svg";
import { ReactComponent as LockIcon } from "@shared/images/lock-big.svg";
import { bem } from "@shared/utils/bem";
import { typographyColor, typographyVariant } from "@shared/Typography/interfaces";

import { showModal } from "@entities/user/model/slice";

import { ModalInterface } from "./interfaces";

import "./styles.scss";

export const Modal = (props: ModalInterface) => {
  const {
    name,
    locked,
    children
  } = props;

  const [block, element] = bem("modal");

  const isModalOpen = useAppSelector((state) => state.user.isModalOpen);
  const dispatch = useAppDispatch();

  const lockIcon = locked && <LockIcon className={element("lock-icon")} />;

  return (
    <Portal target={document.body}>
      <div className={block({ closed: !isModalOpen })}>
        <div className={element("content")}>
          <div className={element("header")}>
            <Typography
              variant={typographyVariant.h2}
              color={typographyColor.black}
            >
              <p className={element("name")}>
                {lockIcon}
                {name}
              </p>
            </Typography>
            <CloseIcon
              className={element("close-icon")}
              onClick={() => dispatch(showModal())}
            />
          </div>
          <div className={element("item-list")}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
