import { Typography } from "@shared/Typography";
import { bem } from "@shared/utils/bem";

import { CompletedStars } from "@widgets/CompletedStars";
import { ExplorerUserInfo } from "@widgets/ExplorerUserInfo";
import { Header } from "@widgets/Header";
import { CurrentStarCard } from "@widgets/CurrentStarCard";
import { RatingCard } from "@widgets/RatingCard";

import { starInfo, tabsList } from "./model";

import "./styles.scss";

export const Explorer = () => {
  const [block, element] = bem("explorer");

  return (
    <div className={block()}>
      <Header />
      <div className={element("container", "container p-0")}>
        <div className={element("row", "row")}>
          <div className={element("profile", "col-xxl-9")}>
            <ExplorerUserInfo />
            <div className={element("current-star")}>
              <div className={element("current-star-heading")}>
                <Typography variant="h2">Текущая звезда</Typography>
              </div>
              <CurrentStarCard
                starInfo={starInfo}
                tabsList={tabsList}
              />
            </div>
            <div className={element("completed-stars")}>
              <div className={element("completed-stars-heading")}>
                <Typography variant="h2">Освоенные звёзды</Typography>
              </div>
              <CompletedStars />
            </div>
          </div>
          <div className={element("rating", "col-xxl-3")}>
            <div className={element("rating-heading")}>
              <Typography variant="h2">Рейтинг</Typography>
            </div>
            <RatingCard />
          </div>
        </div>
      </div>
    </div>
  );
};
