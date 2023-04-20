import { useAppDispatch } from "@app/providers/store/hooks";

import { Modal } from "@shared/Modal";
import { Typography } from "@shared/Typography";
import { Button } from "@shared/buttons/Button";
import { CardBig } from "@shared/cards/CardBig";
import { bem } from "@shared/utils/bem";

import { showModal } from "@entities/user/model";

import { ProgressBar } from "@widgets/ProgressBar";

import "./styles.scss";

export const CurrentStarCard = () => {
  const [block, element] = bem("current-star-card");

  const starInfo = {
    planet: {
      id: 2,
      name: "SQL",
    },
    star: "Groovy",
    curator: "Фамилия Имя Отчество",
    progress: "50",
  };

  const { planet, star, curator, progress } = starInfo;
  const dispatch = useAppDispatch();

  return (
    <div className={block()}>
      <Modal
        modalName={planet.name}
        locked
      >
        ...
      </Modal>
      <CardBig>
        <div className={element("heading")}>
          <Typography variant="h2">
            Планета: {planet.id}. {planet.name}
          </Typography>
        </div>
        <div className={element("current-star")}>
          <Typography variant="regular14">Звезда: {star}</Typography>
        </div>
        <div className={element("current-curator")}>
          <Typography variant="regular14">Преподаватель: {curator}</Typography>
        </div>
        <div className={element("progress")}>
          <Typography
            variant="regular16"
            color="primary-500"
          >
            Освоено {progress}%
          </Typography>
          <span className={element("progress-bar")}>
            <ProgressBar />
          </span>
        </div>
        <div className={element("buttons")}>
          <Button
            size="large"
            title="Отменить"
          />
          <Button
            size="large"
            color="filled"
            title="Продолжить"
            action={() => {
              dispatch(showModal());
            }}
          />
        </div>
      </CardBig>
    </div>
  );
};
