import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { Typography } from "@shared/Typography";
import { ReactComponent as CloseIcon } from "@shared/images/close.svg";
import { ReactComponent as LockIcon } from "@shared/images/lock-big.svg";
import { bem } from "@shared/utils/bem";

import { showModal } from "@entities/user/model";

import { ModalInterface } from "./interfaces";
import "./styles.scss";

export const Modal = ({ modalName, locked, children }: ModalInterface) => {
  const [block, element] = bem("modal");

  const isModalOpen = useAppSelector((state) => state.user.isModalOpen);
  const dispatch = useAppDispatch();

  const lockIcon = locked && <LockIcon className={element("lock-icon")} />;

  return (
    <div className={block({ closed: !isModalOpen })}>
      <div className={element("content")}>
        <div className={element("header")}>
          <Typography
            variant="h2"
            color="black"
          >
            <p className={element("name")}>
              {lockIcon}
              {modalName}
            </p>
          </Typography>
          <CloseIcon
            className={element("close-icon")}
            onClick={() => dispatch(showModal())}
          />
        </div>
        <div className={element("item-list")}>{children}</div>
      </div>
    </div>
  );
};
