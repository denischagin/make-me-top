import { TabPanel } from "react-tabs";

import { useAppDispatch } from "@app/providers/store/hooks";

import { Modal } from "@shared/Modal";
import { Typography } from "@shared/Typography";
import { Button } from "@shared/Button";
import { MmtTabs } from "@shared/MmtTabs";
import { CardBig } from "@shared/CardBig";
import { bem } from "@shared/utils/bem";
import { Badge } from "@shared/Badge";
import { BadgeColor, ButtonColor, ButtonSize, TypographyColor, TypographyVariant } from "@shared/types/enums";

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
          <TabPanel>Контент 1</TabPanel>
          <TabPanel>Контент 1</TabPanel>
        </MmtTabs>
      </Modal>
      <CardBig>
        <div className={element("heading")}>
          <Typography variant={TypographyVariant.h2}>
            Планета: {planet.id}. {planet.name}
          </Typography>
        </div>
        <div className={element("current-star")}>
          <Typography variant={TypographyVariant.regular14}>Звезда: {star}</Typography>
        </div>
        <div className={element("current-curator")}>
          <Typography variant={TypographyVariant.regular14}>Преподаватель: {curator}</Typography>
        </div>
        <div className={element("progress")}>
          <Typography
            variant={TypographyVariant.medium16}
            color={TypographyColor.primary500}
          >
            Освоено {progress}%
          </Typography>
          <span className={element("progress-bar")}>
            <ProgressBar />
          </span>
        </div>
        <div className={element("buttons")}>
          <Button
            size={ButtonSize.large}
            title="Отменить"
          />
          <Button
            size={ButtonSize.large}
            color={ButtonColor.filled}
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
