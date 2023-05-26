import { useAppSelector } from "@app/providers/store/hooks";

import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";
import { ArrowButton } from "@shared/ArrowButton";
import { InfoCard } from "@shared/InfoCard";

import { arrowButtonDirection } from "@shared/ArrowButton/interfaces";

import { Header } from "@widgets/Header";
import { Reviews } from "@widgets/Reviews";
import { CuratorCardUserInfo } from "@widgets/CuratorCardUserInfo";
import { CuratorStars } from "@widgets/CuratorStars";

import { REVIEW_LIST } from "./model";

import "./styles.scss";

export const CuratorCard = () => {
  const [block, element] = bem("curator-card");

  return (
    <div className={block()}>
      <BackgroundProfile />
      <Header />
      <div className={element("container", "container p-0")}>
        <div className={element("profile")}>
          <div className={element("back-arrow")}>
            <ArrowButton direction={arrowButtonDirection.left} />
          </div>
          <CuratorCardUserInfo />
        </div>
        <CuratorStars />
        <Reviews reviews={REVIEW_LIST} />
      </div>
    </div>
  );
};
