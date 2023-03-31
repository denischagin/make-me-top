import { AvatarInterface } from "./interfaces";
import "./styles.scss";

export const AvatarBig = (props: AvatarInterface) => {
  return (
    <>
      <div className="avatar-big">
        <div className="avatar-big__planet" />
      </div>
      <img
        src={props.image}
        alt=""
        className="avatar-big-image"
      />
    </>
  );
};
