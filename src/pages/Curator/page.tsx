import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";
import { GradeApplicationCard } from "@shared/GradeApplicationCard";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";

import { Header } from "@widgets/Header";
import { EducationApplications } from "@widgets/EducationApplications";
import { ExplorerCardList } from "@widgets/ExplorerCardList";
import { GradeApplications } from "@widgets/GradeApplications";
import { UserInfo } from "@widgets/UserInfo";

import {
  CURATOR_INFO,
  APPLICATIONS_LIST,
  MY_EXPLORERS,
  GRADE_APPLICATIONS_LIST
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
              <UserInfo
                name={CURATOR_INFO.name}
                avatar={CURATOR_INFO.avatar}
                rating={CURATOR_INFO.rating}
                planets={CURATOR_INFO.planets}
                explorers={CURATOR_INFO.explorers}
              />
              <EducationApplications applications={APPLICATIONS_LIST} />
              <div className="">
                <Typography variant={typographyVariant.h2}>
                  <div className={element("final-grade-heading", "mb-4")}>Итоговая оценка</div>
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
