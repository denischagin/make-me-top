import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

import "./styles.scss";

export const Modal = (props: PropsWithChildren) => {
  const user = useSelector((state: any) => state.userReducer.isRegistered);
  return <>{user && <div className="modal">{props.children}</div>}</>;
};
