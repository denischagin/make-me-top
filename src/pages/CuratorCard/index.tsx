import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";
import { ArrowButton } from "@shared/ArrowButton";
import { arrowButtonDirection } from "@shared/ArrowButton/interfaces";

import { UserInfo } from "@widgets/UserInfo";
import { Header } from "@widgets/Header";
import { Reviews } from "@widgets/Reviews";
import { CuratorStars } from "@widgets/CuratorStars";

import { USER_INFO } from "./model";

import "./styles.scss";

export const CuratorCard = () => {
  const [block, element] = bem("curator-card");

  return (
    <>
      <BackgroundProfile />
      <div className={block()}>
        <Header />
        <div className={element("container", "container p-0")}>
          <div className={element("profile")}>
            <div className={element("back-arrow")}>
              <ArrowButton direction={arrowButtonDirection.left}/>
            </div>
            <UserInfo
              name={USER_INFO.name}
              avatar={USER_INFO.avatar}
              rating={USER_INFO.rating}
              stars={USER_INFO.stars}
              explorers={USER_INFO.explorers}
            />
          </div>
          <CuratorStars />
          <Reviews />
        </div>
      </div>
    </>
  );
};
