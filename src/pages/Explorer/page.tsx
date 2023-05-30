import { useAppSelector } from "@app/providers/store/hooks";

import { userInfoSelector } from "@entities/user/model/selectors";

import { Typography } from "@shared/Typography";
import { BackgroundProfile } from "@shared/BackgroundProfile";

import { bem } from "@shared/utils/bem";

import { CompletedStars } from "@widgets/CompletedStars";
import { CurrentStarCard } from "@widgets/CurrentStarCard";
import { Header } from "@widgets/Header";
import { RatingCard } from "@widgets/RatingCard";
import { ExplorerUserInfo } from "@widgets/ExplorerUserInfo";

import { typographyVariant } from "@shared/Typography/interfaces";

import {
  STAR_INFO,
  TABS_LIST,
  USERS_LIST
} from "./model";

import "./styles.scss";

export const Explorer = () => {
  const [block, element] = bem("explorer");

  const userInfo = useAppSelector(userInfoSelector);

  return (
    <>
      <BackgroundProfile />
      <div className={block()}>
        <Header />
        <div className={element("container", "container p-0")}>
          <div className={element("row", "row")}>
            <div className={element("profile", "col-xxl-9")}>
              <ExplorerUserInfo />
              <div className={element("current-star")}>
                <Typography
                  className={element("current-star-heading", "mb-4")}
                  variant={typographyVariant.h2}
                >
                  Текущая звезда
                </Typography>
                <CurrentStarCard
                  starInfo={STAR_INFO}
                  tabsList={TABS_LIST}
                />
              </div>
              <div className={element("completed-stars")}>
                <Typography
                  className={element("completed-stars-heading", "mb-4 mt-1")}
                  variant={typographyVariant.h2}
                >
                  Освоенные звёзды
                </Typography>
                <CompletedStars />
              </div>
            </div>
            <div className={element("rating", "col-xxl-3")}>
              <Typography
                variant={typographyVariant.h2}
                className={element("rating-heading", "mt-1 mb-4")}
              >
                Рейтинг
              </Typography>
              <RatingCard
                list={USERS_LIST}
                user={userInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
