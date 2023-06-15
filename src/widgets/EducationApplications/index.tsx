import { EducationApplicationCard } from "@shared/EducationApplicationCard";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { EducationApplicationsInterface } from "./interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

export const EducationApplications = (props: EducationApplicationsInterface) => {
  const {
    applications
  } = props;

  const [block, element] = bem("education-application");

  return (
    <div className={block()}>
      <Typography
        className={element("heading", "mb-4")}
        variant={typographyVariant.h2}
      >
        Заявки на обучение
      </Typography>
      <div className={element("cards")}>
        {
          applications.length !== 0
            ? applications.map((application) => (
              <EducationApplicationCard
                key={application.id}
                user={application}
              />
            ))
            : <Typography variant={typographyVariant.medium16}>
              Заявки отсутствуют
            </Typography>
        }
      </div>
    </div>
  );
};
