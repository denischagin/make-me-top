import { bem } from "@shared/utils/bem";
import { Avatar } from "@shared/Avatar";
import { avatarSize } from "@shared/Avatar/interfaces";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { Rating } from "@shared/Rating";
import { Button } from "@shared/Button";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
import { Card } from "@shared/Card";
import { cardSize } from "@shared/Card/interfaces";
import {
  ratingScoreColor,
  ratingSize,
  ratingStarColor
} from "@shared/Rating/interfaces";

import { EducationApplicationCardInterface } from "./interfaces";

import "./styles.scss";

export const EducationApplicationCard = (props: EducationApplicationCardInterface) => {
  const {
    user
  } = props;

  const [block, element] = bem("application-education-card");

  return (
    <div className={block()}>
      <Card size={cardSize.large}>
        <div className={element("content")}>
          <div className={element("info")}>
            <Avatar
              image={user.avatar}
              size={avatarSize.medium}
            />
            <div className={element("about")}>
              <Typography variant={typographyVariant.regular14}>
                <span>Звезда: {user.planet}</span>
              </Typography>
              <Typography variant={typographyVariant.medium16}>
                <p className={element("user-name")}>{user.name}</p>
              </Typography>
            </div>
          </div>
          <div className={element("extra-content")}>
            <div className={element("rating")}>
              <Rating
                starColor={ratingStarColor.primary500}
                size={ratingSize.large}
                scoreColor={ratingScoreColor.white}
                rating={user.rating}
                reflect
              />
            </div>
            <div className={element("buttons")}>
              <Button
                title={"Отклонить"}
                size={buttonSize.large}
              />
              <Button
                title={"Принять"}
                color={buttonColor.filled}
                size={buttonSize.large}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
