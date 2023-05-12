import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import {BackgroundGalaxyPage} from "@shared/BackgroundGalaxyPage";
import Galaxy from "@entities/Galaxy/ui";

import { getGalaxy } from "@entities/Galaxy/api/getGalaxy";

import "./styles.scss";
import GalaxyPageName from "@shared/GalaxyPageName";


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
      <BackgroundGalaxyPage/>
      <GalaxyPageName
          galaxyName={galaxyName}
      />
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