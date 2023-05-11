import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";

import { Header } from "@widgets/Header";
import { CuratorUserInfo } from "@widgets/CuratorUserInfo";
import { ApplicationsEducationList } from "@widgets/ApplicationsEducationList";

import {
  CURATOR_INFO,
  APPLICATIONS_LIST
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
          <CuratorUserInfo curator={CURATOR_INFO} />
          <ApplicationsEducationList applications={APPLICATIONS_LIST}/>
        </div>
      </div>
    </>
  );
};
