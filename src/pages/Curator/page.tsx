import { BackgroundProfile } from "@shared/BackgroundProfile";
import { GradeApplicationCard } from "@shared/GradeApplicationCard";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { CuratorUserInfo } from "@widgets/CuratorUserInfo";
import { EducationApplications } from "@widgets/EducationApplications";
import { ExplorerCardList } from "@widgets/ExplorerCardList";
import { GradeApplications } from "@widgets/GradeApplications";
import { Header } from "@widgets/Header";

import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

import {
  APPLICATIONS_LIST,
  CURATOR_INFO,
  GRADE_APPLICATIONS_LIST,
  MY_EXPLORERS,
} from "./model";

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
              <EducationApplications applications={APPLICATIONS_LIST} />
              <div className="">
                <Typography variant={typographyVariant.h2}>
                  <div className={element("final-grade-heading", "mb-4")}>
                    Итоговая оценка
                  </div>
                </Typography>
                <GradeApplicationCard user={GRADE_APPLICATIONS_LIST[0]} />
              </div>
              <GradeApplications applications={GRADE_APPLICATIONS_LIST} />
            </div>
            <div className={element("explorers-list", "col-xxl-3")}>
              <ExplorerCardList explorers={MY_EXPLORERS} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
