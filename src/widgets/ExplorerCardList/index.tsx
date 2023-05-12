import { bem } from "@shared/utils/bem";
import { CardBig } from "@shared/CardBig";
import { ExplorerCard } from "@shared/ExplorerCard";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { ExplorerCardInterface } from "@shared/types/common";
import { Button } from "@shared/Button";
import { buttonSize } from "@shared/Button/interfaces";

import { ExplorerCardListInterface } from "./interfaces";

import "./styles.scss";

export const ExplorerCardList = (props: ExplorerCardListInterface) => {
  const {
    explorers
  } = props;

  const [block, element] = bem("explorer-card-list");

  const totalExplorers = explorers.length;

  return (
    <div className={block()}>
      <div className={element("heading", "mb-4")}>
        <Typography variant={typographyVariant.h2}>
          Мои ученики
        </Typography>
      </div>
      <CardBig>
        <div className={element("card-heading", "mb-4")}>
          <Typography variant={typographyVariant.regular16}>
            Всего учеников: { totalExplorers }
          </Typography>
        </div>
        {
          explorers.slice(0, 9).map((item: ExplorerCardInterface) => (
            <ExplorerCard
              key={item.id}
              name={item.name}
              avatar={item.avatar}
            />
          ))
        }
        {
          explorers.length > 9 &&
          <div className={element("button", "mt-4")}>
            <Button
              title={"Все ученики"}
              size={buttonSize.large}
            />
          </div>
        }
      </CardBig>
    </div>
  );
};
