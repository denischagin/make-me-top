import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { getGalaxy } from "@entities/Galaxy/api/getGalaxy";
import Galaxy from "@entities/Galaxy/ui";

import "./styles.scss";

export const GalaxyPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGalaxy({}));
  }, [dispatch]);

  const orbitList = useAppSelector(
    (state) => state.galaxy.orbitList
  );

  return (
    <div className="galaxyPage">
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