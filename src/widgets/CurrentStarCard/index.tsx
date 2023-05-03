import { TabPanel } from "react-tabs";

import { useAppDispatch } from "@app/providers/store/hooks";

import { Modal } from "@shared/Modal";
import { Typography } from "@shared/Typography";
import { Button } from "@shared/Button";
import { MmtTabs } from "@shared/MmtTabs";
import { CardBig } from "@shared/CardBig";
import { bem } from "@shared/utils/bem";
import { PlanetList } from "@shared/PlanetList";
import { UsersList } from "@shared/UsersList";
import { CurrentUserItem } from "@shared/CurrentUserItem";
import { DividingLine } from "@shared/DividingLine";
import { FinalGrade } from "@shared/FinalGrade";
import { typographyVariant, typographyColor } from "@shared/Typography/interfaces";
import { buttonSize, buttonColor } from "@shared/Button/interfaces";

import { showModal } from "@entities/user/model";

import { ProgressBar } from "@widgets/ProgressBar";

import {
  PLANETS_LIST,
  CURATORS_LIST,
  EXPLORERS_LIST,
  USER_INFO,
  CURATOR_INFO
} from "./model";

import { CurrentStarCardInterface } from "./interfaces";

import "./styles.scss";
export const CurrentStarCard = (props: CurrentStarCardInterface) => {
  const {
    tabsList,
    starInfo: {
      planet: {
        name,
        id
      },
      star,
      curator,
      progress
    },
  } = props;

  const [block, element] = bem("current-star-card");

  const dispatch = useAppDispatch();

  return (
    <div className={block()}>
      <Modal name={ name }>
        <MmtTabs list={tabsList}>
          <TabPanel>
            <PlanetList
              list={PLANETS_LIST}
              currentPlanet={ name }
            />
            <FinalGrade />
          </TabPanel>
          <TabPanel>
            <CurrentUserItem
              user={USER_INFO}
              badgeTitle="Мой рейтинг"
            />
            <DividingLine color="gray-500"/>
            <UsersList list={EXPLORERS_LIST} />
          </TabPanel>
          <TabPanel>
            <CurrentUserItem
              user={CURATOR_INFO}
              badgeTitle="Мой хранитель"
            />
            <DividingLine color="gray-500"/>
            <UsersList list={CURATORS_LIST} />
          </TabPanel>
        </MmtTabs>
      </Modal>
      <CardBig>
        <div className={element("heading")}>
          <Typography variant={typographyVariant.h2}>
            Планета: {id}. {name}
          </Typography>
        </div>
        <div className={element("current-star")}>
          <Typography variant={typographyVariant.regular14}>Звезда: {star}</Typography>
        </div>
        <div className={element("current-curator")}>
          <Typography variant={typographyVariant.regular14}>Преподаватель: {curator}</Typography>
        </div>
        <div className={element("progress")}>
          <Typography
            variant={typographyVariant.medium16}
            color={typographyColor.primary500}
          >
            Освоено {progress}%
          </Typography>
          <span className={element("progress-bar")}>
            <ProgressBar />
          </span>
        </div>
        <div className={element("buttons")}>
          <Button
            size={buttonSize.large}
            title="Отменить"
          />
          <Button
            size={buttonSize.large}
            color={buttonColor.filled}
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
