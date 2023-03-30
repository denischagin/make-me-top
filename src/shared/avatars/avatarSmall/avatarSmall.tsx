import { AvatarInterface } from "./interfaces";
import "./styles.scss"

export const AvatarSmall = (props: AvatarInterface) => {
  return (
    <img src={props.image} alt="" className="avatar-small"/>
  );
}
