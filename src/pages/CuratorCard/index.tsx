import { ArrowButton } from "@shared/ArrowButton";
import { BackgroundProfile } from "@shared/BackgroundProfile";

import { bem } from "@shared/utils/bem";

import { CuratorCardUserInfo } from "@widgets/CuratorCardUserInfo";
import { CuratorStars } from "@widgets/CuratorStars";
import { Header } from "@widgets/Header";
import { Reviews } from "@widgets/Reviews";

import { arrowButtonDirection } from "@shared/ArrowButton/interfaces";

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
        <Reviews />
      </div>
    </div>
  );
};
