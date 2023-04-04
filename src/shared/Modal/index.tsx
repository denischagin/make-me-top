import { PropsWithChildren } from "react";

import { useAppSelector } from "@/app/providers/store/hooks";

import "./styles.scss";

export const Modal = (props: PropsWithChildren) => {
  const user = useAppSelector(state => state.user.isRegistered);

  return <>{user && <div className="modal">{props.children}</div>}</>;
};
