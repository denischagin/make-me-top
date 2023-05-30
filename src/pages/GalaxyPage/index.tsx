import React, {useEffect, useRef} from "react";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import {BackgroundGalaxyPage} from "@shared/BackgroundGalaxyPage";
import Galaxy from "@entities/Galaxy/ui";

import { getGalaxy } from "@entities/Galaxy/api/getGalaxy";

import "./styles.scss";
import GalaxyPageName from "@shared/GalaxyPageName";
import {getUser} from "@entities/user/api/getUser";


export const GalaxyPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const galaxyPageRef = useRef<HTMLDivElement | null>(null);

  const testUserProgress = {
      "openSystemList":[4,7,8,9,10,13,17,],
      "closeSystemList":[11,12,14,15,16,18,19,20,21,22,23,24],
      "educationSystemList": [
          {"systemId":1,"completed":25},
          {"systemId":2,"completed":50},
          {"systemId":3,"completed":75},
          {"systemId":5,"completed":50},
          {"systemId":6,"completed":100}
      ]}

  useEffect(() => {
    dispatch(getGalaxy({}));

    // dispatch(getUser({
    //     username: "test"
    // }));

  }, []);

  const user = useAppSelector(
      (state) => state.user.userData
  )

  const galaxyName = useAppSelector(
      (state) => state.galaxy.galaxyName
  );

  const orbitList = useAppSelector(
    (state) => state.galaxy.orbitList
  );

  return (
    <div
        className="galaxyPage"
        ref={galaxyPageRef}
    >
      <BackgroundGalaxyPage/>
      <GalaxyPageName
          galaxyName={galaxyName}
      />
      <Galaxy
          galaxyPage={galaxyPageRef.current}
          svgContainerClass="galaxyPage__svg-container"
          userProgress={testUserProgress}
          orbitList={orbitList}
      />
    </div>
  )
}