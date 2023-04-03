import { CompletedStars } from "@/widgets/CompletedStars";
import { ExplorerUserInfo } from "@/widgets/ExplorerUserInfo";
import { Header } from "@/widgets/Header";
import { CurrentStarCard } from "@/widgets/cards/CurrentStarCard";
import { RatingCard } from "@/widgets/cards/RatingCard";

import "./styles.scss";

export const Explorer = () => {
  return (
    <div className="explorer">
      <Header />
      <div className="container">
        <div className="profile">
          <ExplorerUserInfo />
          <p className="container__profile-heading">Текущая звезда</p>
          <CurrentStarCard />
          <div className="container__completed-stars">
            <p className="container__completed-stars-heading">
              Освоенные звёзды
            </p>
            <CompletedStars />
          </div>
        </div>
        <div className="container__rating">
          <p className="container__rating-heading">Рейтинг</p>
          <RatingCard />
        </div>
      </div>
    </div>
  );
};
