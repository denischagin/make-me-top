import { TabPanel } from "react-tabs";

import { useAppDispatch } from "@app/providers/store/hooks";

import { Modal } from "@shared/Modal";
import { Typography } from "@shared/Typography";
import { Button } from "@shared/Button";
import { MmtTabs } from "@shared/MmtTabs";
import { CardBig } from "@shared/CardBig";
import { bem } from "@shared/utils/bem";

import { showModal } from "@entities/user/model";

import { ProgressBar } from "@widgets/ProgressBar";

import { CurrentStarCardInterface } from "./interfaces";

import "./styles.scss";

export const CurrentStarCard = (props: CurrentStarCardInterface) => {
  const {
    tabsList,
    starInfo: {
      planet,
      star,
      curator,
      progress
    },
  } = props;

  const [block, element] = bem("current-star-card");

  const dispatch = useAppDispatch();

  return (
    <div className={block()}>
      <Modal
        name={planet.name}
        locked
      >
        <MmtTabs list={tabsList}>
          <TabPanel>Контент 1</TabPanel>
          <TabPanel>Контент 2</TabPanel>
          <TabPanel>Контент 3</TabPanel>
        </MmtTabs>
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
            variant="medium16"
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
