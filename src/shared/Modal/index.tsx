import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/app/providers/store";

import "./styles.scss";

export const Modal = (props: PropsWithChildren) => {
  const user = useSelector((state: RootState) => state.userReducer.isRegistered);
  return <>{user && <div className="modal">{props.children}</div>}</>;
};
