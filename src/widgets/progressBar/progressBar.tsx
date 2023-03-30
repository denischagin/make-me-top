import { ReactComponent as RocketIcon } from "../../shared/images/rocket.svg";
import "./styles.scss"

export const ProgressBar = () => {
  return (
    <div className="rocket-line-container">
      <div className="rocket-image">
        <RocketIcon />
      </div>
      <span className="rocket-line-container__dot"/>
        <div className="line" />
      <span className="rocket-line-container__dot"/>
    </div>
  );
}
