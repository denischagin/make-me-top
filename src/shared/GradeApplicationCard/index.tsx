import { Avatar } from "@shared/Avatar";
import { Button } from "@shared/Button";
import { Card } from "@shared/Card";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { GradeApplicationCardInterface } from "./interfaces";
import { avatarSize } from "@shared/Avatar/interfaces";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
import { cardSize } from "@shared/Card/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

export const GradeApplicationCard = (props: GradeApplicationCardInterface) => {
  const {
    user
  } = props;

  const [block, element] = bem("grade-application-card");

  return (
    <div className={block()}>
      <Card
        size={cardSize.large}
        glow
      >
        <div className={element("content")}>
          <div className={element("info")}>
            <Avatar
              image={user.avatar}
              size={avatarSize.medium}
            />
            <div className={element("about")}>
              <Typography
                className={element("name")}
                variant={typographyVariant.regular14}
              >
                {user.name}
              </Typography>
              <Typography
                className={element("star-title")}
                variant={typographyVariant.regular14}
              >
                Звезда: {user.star}
              </Typography>
              <Typography
                className={element("planet")}
                variant={typographyVariant.medium16}
              >
                Планета: {user.planet}
              </Typography>
            </div>
          </div>
          <div className={element("button")}>
            <Button
              title={"Оценить"}
              color={buttonColor.filled}
              size={buttonSize.large}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
