import { Button } from "@shared/buttons/Button";
import { CardBig } from "@shared/cards/CardBig";
import { ProgressBar } from "@widgets/ProgressBar";

import "./styles.scss";

export const CurrentStarCard = () => {
  const starInfo = {
    planet: {
      id: 2,
      name: "SQL",
    },
    star: "Groovy",
    curator: "Фамилия Имя Отчество",
    progress: "50",
  };

  const { planet, star, curator, progress } = starInfo;

  return (
    <div className="current-star-card">
      <CardBig>
        <p className="current-star-card__heading">
          Планета: {planet.id}. {planet.name}
        </p>
        <p className="current-star-card__current-star">Звезда: {star}</p>
        <p className="current-star-card__current-curator">
          Преподаватель: {curator}
        </p>
        <div className="current-star-card__progress">
          Освоено {progress}%
          <span className="current-star-card__progress-bar">
            <ProgressBar />
          </span>
        </div>
        <div className="buttons">
          <Button
            size="large"
            title="Отменить"
          />
          <Button
            size="large"
            color="filled"
            title="Продолжить"
          />
        </div>
      </CardBig>
    </div>
  );
};








