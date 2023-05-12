import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";

import { Header } from "@widgets/Header";
import { CuratorUserInfo } from "@widgets/CuratorUserInfo";
import { EducationApplications } from "@widgets/EducationApplications";
import { ExplorerCardList } from "@widgets/ExplorerCardList";

import {
  CURATOR_INFO,
  APPLICATIONS_LIST,
  MY_EXPLORERS
} from "./model";

import "./styles.scss";

export const Curator = () => {
  const [block, element] = bem("curator");

  return (
    <>
      <BackgroundProfile />
      <div className={block()}>
        <Header />
        <div className={element("container", "container p-0")}>
          <div className={element("row", "row")}>
            <div className={element("profile", "col-xxl-9")}>
              <CuratorUserInfo curator={CURATOR_INFO} />
              <EducationApplications applications={APPLICATIONS_LIST}/>
            </div>
            <div className={element("explorers-list", "col-xxl-3")}>
              <ExplorerCardList explorers={MY_EXPLORERS}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
