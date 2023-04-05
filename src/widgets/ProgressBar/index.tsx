import { ReactComponent as RocketIcon } from "@/shared/images/rocket.svg";

import "./styles.scss";

export const ProgressBar = () => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__icon">
        <RocketIcon />
      </div>
      <div className="progress-bar__dot" />
      <div className="progress-bar__line" />
      <div className="rogress-bar__dot" />
    </div>
  );
};
