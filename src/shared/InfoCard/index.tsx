import { Typography } from "@shared/Typography";
import { bem } from "@shared/utils/bem";
import { typographyVariant } from "@shared/Typography/interfaces";
import { Card } from "@shared/Card";
import { cardSize } from "@shared/Card/interfaces";

import { InfoCardInterface } from "./interfaces";

import "./styles.scss";

export const InfoCard = (props: InfoCardInterface) => {
  const {
    title,
    count
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
        <span className={element("count")}>{ count }</span>
      </Card>
    </div>
  );
};
