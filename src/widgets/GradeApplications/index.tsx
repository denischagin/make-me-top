import { GradeApplicationCard } from "@shared/GradeApplicationCard";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { GradeApplicationsInterface } from "./interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

export const GradeApplications = (props: GradeApplicationsInterface) => {
  const {
    applications
  } = props;

  const [block, element] = bem("grade-application");

  return (
    <div className={block()}>
      <Typography
        className={element("heading", "mb-4")}
        variant={typographyVariant.h2}
      >
        Запрос на проверку
      </Typography>
      <div className={element("cards")}>
        {
          applications.length !== 0
            ? applications.map((application) => (
              <GradeApplicationCard
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
