import { Typography } from "@shared/Typography";
import { Card } from "@shared/Card";

import { bem } from "@shared/utils/bem";

import { InfoCardInterface } from "./interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";
import { cardSize } from "@shared/Card/interfaces";

import "./styles.scss";

export const InfoCard = (props: InfoCardInterface) => {
  const {
    title,
    value
  } = props;

  const [block, element] = bem("info-сard");

  return (
    <div className={block()}>
      <Card size={cardSize.small}>
        <Typography
          variant={typographyVariant.regular16}
          className={element("heading")}
        >
          {title}
        </Typography>
        <div className={element("value")}>
          {value}
        </div>
      </Card>
    </div>
  );
};
