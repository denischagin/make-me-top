import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { getGalaxy } from "@entities/Galaxy/api/getGalaxy";
import Galaxy from "@entities/Galaxy/ui";

import "./styles.scss";
import {BackgroundProfile} from "@shared/BackgroundProfile";

export const GalaxyPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGalaxy({}));
  }, [dispatch]);

  const galaxyName = useAppSelector(
      (state) => state.galaxy.galaxyName
  );

  const orbitList = useAppSelector(
    (state) => state.galaxy.orbitList
  );

  return (
    <div className="galaxyPage">
      <BackgroundProfile/>
      <div className="galaxyPage__description">
        <div
            className="galaxyPage__description_page-context"
        >
          Галактика
        </div>
        <div
            className="galaxyPage__description_galaxy-name"
        >
          {galaxyName}
        </div>
      </div>
      <Galaxy
          orbitList={orbitList}
          width={1920}
          height={910}
          planetWidth={80}
          planetHeight={80}
      />
    </div>
  )
}