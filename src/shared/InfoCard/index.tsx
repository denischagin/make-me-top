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
        <div className={element("heading")}>
          <Typography variant={typographyVariant.regular16}>
            { title }
          </Typography>
        </div>
        <div className={element("value")}>
          { value }
        </div>
      </Card>
    </div>
  );
};
