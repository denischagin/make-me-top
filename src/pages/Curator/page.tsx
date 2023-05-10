import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";

import { Header } from "@widgets/Header";
import { CuratorUserInfo } from "@widgets/CuratorUserInfo";

import { CURATOR_INFO } from "./model";

import "./styles.scss";

export const Curator = () => {
  const [block, element] = bem("curator");

  return (
    <>
      <BackgroundProfile />
      <div className={block()}>
        <Header />
        <div className={element("container", "container p-0")}>
          <CuratorUserInfo curator={CURATOR_INFO} />
        </div>
      </div>
    </>
  );
};
