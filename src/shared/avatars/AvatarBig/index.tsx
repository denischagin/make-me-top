import { AvatarInterface } from "./interfaces";
import "./styles.scss";

export const AvatarBig = (props: AvatarInterface) => {
  return (
    <>
      <div className="avatar">
        <div className="avatar__orbit" />
      </div>
      <img
        src={props.image}
        alt=""
        className="avatar-image"
      />
    </>
  );
};
