import { ReactComponent as StarIcon } from "@/shared/images/star.svg";
<<<<<<<< HEAD:src/widgets/completedStars/completedStars.tsx
import { Star } from "@/shared/stars/star";
========
import { Star } from "@/shared/Star";
import { arrayOfStars } from "./model";
>>>>>>>> 77371ee7 (MMT-22: сменил названия папок и файлов, все папки компонентов с заглавной буквы, файл компонента index.tsx):src/widgets/CompletedStars/index.tsx

import { arrayOfStars } from "./model";
import "./styles.scss";

export const CompletedStars = () => {
  return (
    <div className="completed-stars">
      {arrayOfStars.map((item) => (
        <Star
          color="orange"
          key={item.name}
        >
          <p className="completed-stars__label">{item.name}</p>
          <span className="completed-stars__rating">
            <StarIcon />
            <p className="completed-stars__rating-num">{item.rate}</p>
          </span>
        </Star>
      ))}
    </div>
  );
};
