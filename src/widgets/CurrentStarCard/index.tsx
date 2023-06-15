import { TabPanel } from "react-tabs";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import {
  userCuratorsListSelector,
  userExplorersListSelector,
  userInfoSelector,
  userIsModalOpenSelector,
} from "@entities/user/model/selectors";
import { showModal } from "@entities/user/model/slice";
import { getModalPlanets } from "@entities/user/thunks/getModalPlanets";

import { Button } from "@shared/Button";
import { Card } from "@shared/Card";
import { CircleModal } from "@shared/CircleModal";
import { CurrentUserItem } from "@shared/CurrentUserItem";
import { DividingLine } from "@shared/DividingLine";
import { FinalGrade } from "@shared/FinalGrade";
import { MmtTabs } from "@shared/MmtTabs";
import { PlanetList } from "@shared/PlanetList";
import { Typography } from "@shared/Typography";
import { UsersList } from "@shared/UsersList";

import { bem } from "@shared/utils/bem";

import { ProgressBar } from "@widgets/ProgressBar";

import { CurrentStarCardInterface } from "./interfaces";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
import { cardSize } from "@shared/Card/interfaces";
import { DividingLineColor } from "@shared/DividingLine/interfaces";
import {
  typographyColor,
  typographyVariant,
} from "@shared/Typography/interfaces";

import "./styles.scss";

const CURRENT_PLANET = "SQL";

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
      progress,
    },
  } = props;

  const [block, element] = bem("current-star-card");

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(userInfoSelector);
  const explorersList = useAppSelector(userExplorersListSelector);
  const curatorsList = useAppSelector(userCuratorsListSelector);
  const isModalOpen = useAppSelector(userIsModalOpenSelector);

  return (
    <div className={block()}>
      {isModalOpen && (
        <CircleModal
          header="Groovy"
          onClose={() => dispatch(showModal())}
        >
          <MmtTabs list={tabsList}>
            <TabPanel>
              <PlanetList currentPlanet={CURRENT_PLANET} />
              <FinalGrade />
            </TabPanel>
            <TabPanel>
              <CurrentUserItem
                user={userInfo}
                badgeTitle="Мой рейтинг"
              />
              <DividingLine color={DividingLineColor.gray500} />
              <UsersList list={explorersList} />
            </TabPanel>
            <TabPanel>
              <CurrentUserItem
                user={userInfo}
                badgeTitle="Мой хранитель"
              />
              <DividingLine color={DividingLineColor.gray500} />
              <UsersList list={curatorsList} />
            </TabPanel>
          </MmtTabs>
        </CircleModal>
      )}
      <Card
        size={cardSize.large}
        glow
      >
        <Typography
          variant={typographyVariant.h2}
          className={element("heading")}
        >
          {`Планета: ${id}. ${name}`}
        </Typography>
        <Typography
          variant={typographyVariant.regular14}
          className={element("current-star")}
        >
          {`Звезда: ${star}`}
        </Typography>
        <Typography
          variant={typographyVariant.regular14}
          className={element("current-curator", "mb-4")}
        >
          {`Преподаватель: ${curator}`}
        </Typography>
        <span className={element("progress")}>
          <Typography
            variant={typographyVariant.medium16}
            color={typographyColor.primary500}
          >
            {`Освоено ${progress}%`}
          </Typography>
          <ProgressBar progress={progress} />
        </span>
        <div className={element("buttons")}>
          <Button
            size={buttonSize.large}
            title="Отменить"
          />
          <Button
            size={buttonSize.large}
            color={buttonColor.filled}
            title="Продолжить"
            onClick={() => {
              dispatch(getModalPlanets(id));
              dispatch(showModal());
            }}
          />
        </div>
      </Card>
    </div>
  );
};
