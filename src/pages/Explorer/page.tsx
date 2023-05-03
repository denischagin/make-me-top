import { Typography } from "@shared/Typography";
import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";

import { CompletedStars } from "@widgets/CompletedStars";
import { ExplorerUserInfo } from "@widgets/ExplorerUserInfo";
import { Header } from "@widgets/Header";
import { CurrentStarCard } from "@widgets/CurrentStarCard";
import { RatingCard } from "@widgets/RatingCard";

import {
  USERS_LIST,
  USER_INFO,
  STAR_INFO,
  TABS_LIST
} from "./model";

import "./styles.scss";

export const Explorer = () => {
  const [block, element] = bem("explorer");

  return (
    <div className={block()}>
      <BackgroundProfile />
      <Header />
      <div className={element("container", "container p-0")}>
        <div className={element("row", "row")}>
          <div className={element("profile", "col-xxl-9")}>
            <ExplorerUserInfo user={USER_INFO} />
            <div className={element("current-star")}>
              <div className={element("current-star-heading")}>
                <Typography variant="h2">Текущая звезда</Typography>
              </div>
              <CurrentStarCard
                starInfo={STAR_INFO}
                tabsList={TABS_LIST}
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
            <div className={element("rating-heading", "mt-1")}>
              <Typography variant="h2">Рейтинг</Typography>
            </div>
            <RatingCard
              list={USERS_LIST}
              user={USER_INFO}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
