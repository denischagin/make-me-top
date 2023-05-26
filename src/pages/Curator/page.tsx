import { useAppSelector } from "@app/providers/store/hooks";

import { BackgroundProfile } from "@shared/BackgroundProfile";
import { GradeApplicationCard } from "@shared/GradeApplicationCard";
import { Typography } from "@shared/Typography";
import { InfoCard } from "@shared/InfoCard";

import { bem } from "@shared/utils/bem";

import { EducationApplications } from "@widgets/EducationApplications";
import { ExplorerCardList } from "@widgets/ExplorerCardList";
import { GradeApplications } from "@widgets/GradeApplications";
import { Header } from "@widgets/Header";
import { UserInfo } from "@widgets/UserInfo";

import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

import {
  APPLICATIONS_LIST,
  GRADE_APPLICATIONS_LIST,
  MY_EXPLORERS,
} from "./model";

export const Curator = () => {
  const [block, element] = bem("curator");

  const userInfo = useAppSelector((state) => state.user.userInfo);

  const {
    name,
    avatar,
    rating,
    planets,
    explorers,
  } = userInfo;

  return (
    <>
      <BackgroundProfile />
      <div className={block()}>
        <Header />
        <div className={element("container", "container p-0")}>
          <div className={element("row", "row")}>
            <div className={element("profile", "col-xxl-9")}>
              <UserInfo
                name={name}
                avatar={avatar}
                rating={rating}
              >
                <InfoCard
                  title="Кол-во планет"
                  count={planets || 0}
                />
                <InfoCard
                  title="Кол-во исследователей"
                  count={explorers || 0}
                />
              </UserInfo>
              <EducationApplications applications={APPLICATIONS_LIST} />
              <Typography variant={typographyVariant.h2}>
                <div className={element("final-grade-heading", "mb-4")}>
                  Итоговая оценка
                </div>
              </Typography>
              <GradeApplicationCard user={GRADE_APPLICATIONS_LIST[0]} />
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
