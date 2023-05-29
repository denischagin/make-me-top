
import { Typography } from "@shared/Typography";
import { BackgroundProfile } from "@shared/BackgroundProfile";

import { bem } from "@shared/utils/bem";

import { CompletedStars } from "@widgets/CompletedStars";
import { CurrentStarCard } from "@widgets/CurrentStarCard";
import { ExplorerUserInfo } from "@widgets/ExplorerUserInfo";
import { Header } from "@widgets/Header";
import { RatingCard } from "@widgets/RatingCard";

import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

import { STAR_INFO, TABS_LIST, USERS_LIST, USER_INFO } from "./model";

export const Explorer = () => {
  const [block, element] = bem("explorer");

  return (
    <>
      <BackgroundProfile />
      <div className={block()}>
        <Header />
        <div className={element("container", "container p-0")}>
          <div className={element("row", "row")}>
            <div className={element("profile", "col-xxl-9")}>
              <ExplorerUserInfo user={USER_INFO} />
              <div className={element("current-star")}>
                <div className={element("current-star-heading", "mb-4")}>
                  <Typography variant={typographyVariant.h2}>
                    Текущая звезда
                  </Typography>
                </div>
                <CurrentStarCard
                  starInfo={STAR_INFO}
                  tabsList={TABS_LIST}
                />
              </div>
              <div className={element("completed-stars")}>
                <div className={element("completed-stars-heading", "mb-4")}>
                  <Typography variant={typographyVariant.h2}>
                    Освоенные звёзды
                  </Typography>
                </div>
                <CompletedStars />
              </div>
            </div>
            <div className={element("rating", "col-xxl-3")}>
              <div className={element("rating-heading", "mt-1 mb-4")}>
                <Typography variant={typographyVariant.h2}>Рейтинг</Typography>
              </div>
              <RatingCard
                list={USERS_LIST}
                user={USER_INFO}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
