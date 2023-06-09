import React, { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";
import {bem} from "@shared/utils/bem";

import { BackgroundGalaxyPage } from "@shared/BackgroundGalaxyPage";
import GalaxyPageName from "@shared/GalaxyPageName";
import Galaxy from "@entities/Galaxy/ui";
import { Header } from "@widgets/Header";

import { getGalaxy } from "@entities/Galaxy/api/getGalaxy";
import { getUser } from "@entities/user/api/getUser";

import "./styles.scss";


export const GalaxyPage: React.FC = () => {
  const [block, element] = bem("galaxy-page");

  const dispatch = useAppDispatch();

  const galaxyPageRef = useRef<HTMLDivElement | null>(null);

  const testUserProgress = {
    openSystemList: [4, 7, 8, 9, 10, 13, 17],
    closeSystemList: [11, 12, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24],
    educationSystemList: [
      {
        systemId: 1,
        completed: 25,
      },
      {
        systemId: 2,
        completed: 50,
      },
      {
        systemId: 3,
        completed: 75,
      },
      {
        systemId: 5,
        completed: 50,
      },
      {
        systemId: 6,
        completed: 100,
      },
    ],
  };

  useEffect(() => {
    dispatch(getGalaxy({}));

    // dispatch(getUser({
    //     username: "test"
    // }));
  }, []);

  const user = useAppSelector((state) => state.user.userData);

  const galaxyName = useAppSelector((state) => state.galaxy.galaxyName);

  const orbitList = useAppSelector((state) => state.galaxy.orbitList);

  return (
    <div
      className={block()}
      ref={galaxyPageRef}
    >
      <BackgroundGalaxyPage />
      <Header />
      <GalaxyPageName galaxyName={galaxyName} />
      <Galaxy
        galaxyPage={galaxyPageRef.current}
        svgContainerClass={element("svg-container")}
        userProgress={testUserProgress}
        orbitList={orbitList}
      />
    </div>
  );
};
