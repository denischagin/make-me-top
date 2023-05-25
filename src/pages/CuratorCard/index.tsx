import { useAppSelector } from "@app/providers/store/hooks";

import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";
import { ArrowButton } from "@shared/ArrowButton";
import { arrowButtonDirection } from "@shared/ArrowButton/interfaces";

import { UserInfo } from "@widgets/UserInfo";
import { Header } from "@widgets/Header";
import { Reviews } from "@widgets/Reviews";
import { CuratorStars } from "@widgets/CuratorStars";

import { REVIEW_LIST } from "./model";

import "./styles.scss";

export const CuratorCard = () => {
  const [block, element] = bem("curator-card");

  const userInfo = useAppSelector((state) => state.user.userInfo);

  const {
    name,
    avatar,
    rating,
    stars,
    explorers,
  } = userInfo;

  return (
    <div className={block()}>
      <BackgroundProfile />
      <Header />
      <div className={element("container", "container p-0")}>
        <div className={element("profile")}>
          <div className={element("back-arrow")}>
            <ArrowButton direction={arrowButtonDirection.left} />
          </div>
          <UserInfo
            name={name}
            avatar={avatar}
            rating={rating}
            stars={stars}
            explorers={explorers}
          />
        </div>
        <CuratorStars />
        <Reviews reviews={REVIEW_LIST} />
      </div>
    </div>
  );
};
