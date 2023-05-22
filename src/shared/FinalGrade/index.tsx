import { ReactComponent as LockIcon } from "@shared/images/lock.svg";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";

import { bem } from "@shared/utils/bem";

import "./styles.scss";

import { GRADES } from "./model";

export const FinalGrade = () => {
  const [block, element] = bem("final-grade");

  return (
    <div className={block()}>
      <span className={element("text")}>Итоговая оценка</span>
      <div className={element("stars")}>
        <span>
          {GRADES.map((star) => (
            <StarIcon
              key={star.grade}
              className={element("star-icon")}
            />
          ))}
        </span>
        <span>{<LockIcon className={element("lock-icon")} />}</span>
      </div>
    </div>
  );
};
