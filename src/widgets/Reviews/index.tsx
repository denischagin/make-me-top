import { bem } from "@shared/utils/bem";
import { ReviewCard } from "@shared/ReviewCard";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { Button } from "@shared/Button";
import { buttonSize } from "@shared/Button/interfaces";

import "./styles.scss";

export const Reviews = () => {
  const [block, element] = bem("reviews");

  return (
    <div className={block()}>
      <Typography variant={typographyVariant.h2}>
        <div className={element("planet-name", "mb-4")}>Отзывы</div>
      </Typography>
      <div className={element("cards")}>
        <ReviewCard
          planet={"SQL - базовые навыки"}
          avatar="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg"
          rating={4}
          name={"ФИО исследователя"}
          review={"Прекрасный хранитель, мы освоили звезду за очень короткий срок, мне понравилось с ним работать"}
        />
        <ReviewCard
          planet={"SQL - базовые навыки"}
          avatar="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg"
          rating={5}
          name={"ФИО исследователя"}
          review={"Прекрасный хранитель, мы освоили звезду за очень короткий срок, мне понравилось с ним работать и изучать новые планеты, побольше бы таких хранителей"}
        />
        <ReviewCard
          planet={"SQL - базовые навыки"}
          avatar="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg"
          rating={2}
          name={"ФИО исследователя"}
          review={"Прекрасный хранитель, мы освоили звезду за очень короткий срок, мне понравилось с ним работать и изучать новые планеты, побольше бы таких хранителей"}
        />
        <ReviewCard
          planet={"SQL - базовые навыки"}
          avatar="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg"
          rating={3}
          name={"ФИО исследователя"}
          review={"Прекрасный хранитель, мы освоили звезду за очень короткий срок, мне понравилось с ним работать"}
        />
        <ReviewCard
          planet={"SQL - базовые навыки"}
          avatar="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg"
          rating={5}
          name={"ФИО исследователя"}
          review={"Прекрасный хранитель, мы освоили звезду за очень короткий срок, мне понравилось с ним работать"}
        />
        <ReviewCard
          planet={"SQL - базовые навыки"}
          avatar="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg"
          rating={3}
          name={"ФИО исследователя"}
          review={"Прекрасный хранитель, мы освоили звезду за очень короткий срок, мне понравилось с ним работать и изучать новые планеты, побольше бы таких хранителей"}
        />
      </div>
      <div className={element("button")}>
        <Button
          title="Показать ещё"
          size={buttonSize.large}
        />
      </div>
    </div>
  );
};
