import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { showModal } from "@entities/user/model/slice";

import { Portal } from "@shared/Portal";
import { Typography } from "@shared/Typography";

import { ReactComponent as CloseIcon } from "@shared/images/close.svg";
import { ReactComponent as LockIcon } from "@shared/images/lock-big.svg";

import { bem } from "@shared/utils/bem";

import { userIsModalOpenSelector } from "@entities/user/model/selectors";

import { ModalInterface } from "./interfaces";
import {
  typographyColor,
  typographyVariant,
} from "@shared/Typography/interfaces";

import "./styles.scss";

export const CircleModal = (props: ModalInterface) => {
  const {
    name,
    isLocked,
    children
  } = props;

  const [block, element] = bem("circle-modal");

  const dispatch = useAppDispatch();

  const lockIcon = isLocked && <LockIcon className={element("lock-icon")} />;

  return (
    <Portal target={document.body}>
      <div className={block()}>
        <div className={element("content")}>
          <div className={element("header")}>
            <Typography
              variant={typographyVariant.h2}
              color={typographyColor.black}
              className={element("name")}
            >
              {lockIcon}
              {name}
            </Typography>
            <CloseIcon
              className={element("close-icon")}
              onClick={() => dispatch(showModal())}
            />
          </div>
          <div className={element("item-list")}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};
