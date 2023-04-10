import { Typography } from "@shared/Typography";
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
        <div className="current-star-card__heading">
          <Typography variant="h2">
            Планета: {planet.id}. {planet.name}
          </Typography>
        </div>
        <div className="current-star-card__current-star">
          <Typography variant="regular14">Звезда: {star}</Typography>
        </div>
        <div className="current-star-card__current-curator">
          <Typography variant="regular14">Преподаватель: {curator}</Typography>
        </div>
        <div className="current-star-card__progress">
          <Typography variant="regular16" color="orange">Освоено {progress}%</Typography>
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
