import { bem } from "@shared/utils/bem";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { ApplicationEducationCard } from "@shared/ApplicationEducationCard";

import { ApplicationEducationInterface } from "./interfaces";

import "./styles.scss";

export const ApplicationsEducationList = (props: ApplicationEducationInterface) => {
  const {
    applications
  } = props;

  const [block, element] = bem("curator-application");

  return (
    <div className={block()}>
      <div className={element("heading")}>
        <Typography variant={typographyVariant.h2}>
          Заявки на обучение
        </Typography>
      </div>
      {
        applications.length !== 0
          ? applications.map((application) => (
            <ApplicationEducationCard
              key={application.id}
              user={application}
            />
          ))
          : <Typography variant={typographyVariant.medium16}>Заявки отсутствуют</Typography>
      }
    </div>
  );
};
