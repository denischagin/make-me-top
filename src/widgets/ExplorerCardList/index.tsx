import { Button } from "@shared/Button";
import { Card } from "@shared/Card";
import { ExplorerCard } from "@shared/ExplorerCard";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { ExplorerCardListInterface } from "./interfaces";
import { buttonSize } from "@shared/Button/interfaces";
import { cardSize } from "@shared/Card/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";

import { ExplorerCardInterface } from "@shared/types/common";

import "./styles.scss";

export const ExplorerCardList = (props: ExplorerCardListInterface) => {
  const {
    explorers
  } = props;

  const [block, element] = bem("explorer-card-list");

  const totalExplorers = explorers.length;

  return (
    <div className={block()}>
      <Typography
        variant={typographyVariant.h2}
        className={element("heading", "mb-4")}
      >
        Мои ученики
      </Typography>
      <Card size={cardSize.large}>
        <Typography
          className={element("card-heading", "mb-4")}
          variant={typographyVariant.regular16}>
          Всего учеников: {totalExplorers}
        </Typography>
        {explorers.slice(0, 9).map((item: ExplorerCardInterface) => (
          <ExplorerCard
            key={item.id}
            name={item.name}
            avatar={item.avatar}
          />
        ))}
        {explorers.length > 9 && (
          <div className={element("button", "mt-3")}>
            <Button
              title={"Все ученики"}
              size={buttonSize.large}
            />
          </div>
        )}
      </Card>
    </div>
  );
};
