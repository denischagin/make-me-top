import { PropsWithChildren } from "react";

import { useAppSelector } from "@app/providers/store/hooks";

import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const Modal = (props: PropsWithChildren) => {
  const [block, element] = bem("modal");

  const user = useAppSelector((state) => state.user.isRegistered);
  return <>{user && <div className={block()}>{props.children}</div>}</>;
};
