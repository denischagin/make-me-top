import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import {BackgroundGalaxyPage} from "@shared/BackgroundGalaxyPage";
import Galaxy from "@entities/Galaxy/ui";

import { getGalaxy } from "@entities/Galaxy/api/getGalaxy";

import "./styles.scss";
import GalaxyPageName from "@shared/GalaxyPageName";
import {getUser} from "@entities/user/api/getUser";


export const GalaxyPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const testUserProgress = {
      "openSystemList":[4,6,7,8,9,10,11],
      "closeSystemList":[12,13,14,15,16,17,18,19,20,21,22,23,24],
      "educationSystemList": [
          {"systemId":1,"completed":25},
          {"systemId":2,"completed":50},
          {"systemId":3,"completed":75},
          {"systemId":6,"completed":100}
      ]}

  const user = useAppSelector(
      (state) => state.user.userData
  )

  useEffect(() => {
    dispatch(getGalaxy({}));

    // dispatch(getUser({
    //     username: "test"
    // }));

  }, []);

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