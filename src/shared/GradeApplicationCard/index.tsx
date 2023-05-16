import { bem } from "@shared/utils/bem";
import { Avatar } from "@shared/Avatar";
import { avatarSize } from "@shared/Avatar/interfaces";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { Button } from "@shared/Button";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
import { Card } from "@shared/Card";

import { GradeApplicationCardInterface } from "./interfaces";

import "./styles.scss";
import { cardSize } from "@shared/Card/interfaces";

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
              <Typography variant={typographyVariant.regular14}>
                <span>{user.name}</span>
              </Typography>
              <Typography variant={typographyVariant.regular14}>
                <p className={element("star-title")}>Звезда: {user.star}</p>
              </Typography>
              <Typography variant={typographyVariant.medium16}>
                <p className={element("planet")}>Планета: {user.planet}</p>
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
