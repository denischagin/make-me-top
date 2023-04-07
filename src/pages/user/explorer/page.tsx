import { Typography } from "@shared/Typography";

import { CompletedStars } from "@widgets/CompletedStars";
import { ExplorerUserInfo } from "@widgets/ExplorerUserInfo";
import { Header } from "@widgets/Header";
import { CurrentStarCard } from "@widgets/cards/CurrentStarCard";
import { RatingCard } from "@widgets/cards/RatingCard";

import "./styles.scss";

export const Explorer = () => {
  return (
    <div className="explorer">
      <Header />
      <div className="container">
        <div className="profile">
          <ExplorerUserInfo />
          <div className="current-star">
            <div className="current-star__heading">
              <Typography variant="h2">Текущая звезда</Typography>
            </div>
            <CurrentStarCard />
          </div>
          <div className="container__completed-stars">
            <div className="container__completed-stars-heading">
              <Typography variant="h2">Освоенные звёзды</Typography>
            </div>
            <CompletedStars />
          </div>
        </div>
        <div className="container__rating">
          <div className="container__rating-heading">
            <Typography variant="h2">Рейтинг</Typography>
          </div>
          <RatingCard />
        </div>
      </div>
    </div>
  );
};
