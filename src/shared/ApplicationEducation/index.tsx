import { bem } from "@shared/utils/bem";
import { CardBig } from "@shared/CardBig";
import { Avatar } from "@shared/Avatar";
import { avatarSize } from "@shared/Avatar/interfaces";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { Rating } from "@shared/Rating";
import {
  ratingScoreColor,
  ratingSize,
  ratingStarColor
} from "@shared/Rating/interfaces";

import { ApplicationEducationInterface } from "./interfaces";

import "./styles.scss";

export const ApplicationEducation = (props: ApplicationEducationInterface) => {
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
        applications.map((application) => (
          <div
            key={application.id}
            className={element("application")}
          >
            <CardBig>
              <div className={element("info")}>
                <Avatar
                  image={application.avatar}
                  size={avatarSize.medium}
                />
                <div className={element("about")}>
                  <Typography variant={typographyVariant.regular14}>
                    <span>Звезда: {application.planet}</span>
                  </Typography>
                  <Typography variant={typographyVariant.medium16}>
                    <p className={element("user-name")}>{application.name}</p>
                  </Typography>
                </div>
              </div>
              <div className={element("extra-content")}>
                <Rating
                  starColor={ratingStarColor.primary500}
                  size={ratingSize.large}
                  scoreColor={ratingScoreColor.white}
                  rating={ application.rating }
                  reflect
                />
              </div>
            </CardBig>
          </div>
        ))
      }
    </div>
  );
};
