import React, { useEffect, useState } from "react";
import { TabPanel } from "react-tabs";

import { useAppDispatch } from "@app/providers/store/hooks";

import { MmtTabs } from "@shared/MmtTabs";
import { Modal } from "@shared/Modal";
import { PlanetProgressTypes } from "@shared/types/common";
import { bem } from "@shared/utils/bem";

import { addActivePlanet } from "@entities/Galaxy/lib/addActivePlanet";
import { createSvgContainer } from "@entities/Galaxy/lib/createSvgContainer";
import { deleteAllConnectionLines } from "@entities/Galaxy/lib/deleteAllConnectionLines";
import { isChosenStarClosed } from "@entities/Galaxy/lib/isChosenStarClosed";
import { setStarsActivity } from "@entities/Galaxy/lib/setStarsActivity";
import { showPlanetsChildren } from "@entities/Galaxy/lib/showPlanetsChildren";
import { showPlanetsParents } from "@entities/Galaxy/lib/showPlanetsParents";
import { DEFAULT_CHOSEN_STAR } from "@entities/Galaxy/model/constants";
import { OrbitType, SystemType } from "@entities/Galaxy/model/types";
import { fetchSystemById } from "@entities/Orbit/api/fetchSystemById";
import {
  DATA_PLANET_CHILDREN_LIST,
  DATA_PLANET_ID,
  DATA_PLANET_PARENT_LIST,
  DATA_PLANET_PROGRESS_TYPE,
} from "@entities/Orbit/model/types";
import Orbit from "@entities/Orbit/ui";
import { showModal } from "@entities/user/model/slice";
import { UserProgress } from "@entities/user/model/types";

import { TABS_LIST } from "@pages/Explorer/model";

import "./style.scss";

interface IGalaxyProps {
  galaxyPage: HTMLDivElement | null;
  userProgress: UserProgress;
  orbitList: Array<OrbitType>;
  svgContainerClass: string;
  width: number;
  height: number;
  planetWidth?: number;
  planetHeight?: number;
}

interface IGalaxyOrbitSettings {
  width: number;
  planetWidth: number;
  backgroundWidth: number;
  height: number;
  planetHeight: number;
  backgroundHeight: number;
}

const Galaxy: React.FC<IGalaxyProps> = (props) => {
  const {
    svgContainerClass,
    galaxyPage,
    userProgress,
    orbitList,
    width,
    height,
  } = props;

  const [block, element] = bem("galaxy");

  const dispatch = useAppDispatch();

  const [svgContainer, setSvgContainer] = useState<SVGElement | null>(null);
  const [activeSystemsId, setActiveSystemsId] = useState<Array<number>>([]);
  const [stars, setStars] = useState<NodeListOf<HTMLDivElement>>(
    document.querySelectorAll(".star__orbit.star__orbit--activity-inactive")
  );
  const [lastChosenStar, setLastChosenStar] =
    useState<SystemType>(DEFAULT_CHOSEN_STAR);
  const [userProgressOnLastChosenStar, setUserProgressOnLastChosenStar] =
    useState<boolean>(true);

  const orbitWidthStep = width / (orbitList.length + 1);
  const orbitHeightStep = height / (orbitList.length + 1);

  const galaxyOrbitSettings: IGalaxyOrbitSettings = {
    width,
    planetWidth: props.planetWidth || 80,
    backgroundWidth: width + orbitWidthStep / 2,
    height,
    planetHeight: props.planetWidth || 80,
    backgroundHeight: height + orbitHeightStep / 2,
  };

  useEffect(() => {
    setSvgContainer(
      createSvgContainer({
        galaxyPage,
        svgContainerClass,
      })
    );
  }, [galaxyPage]);

  useEffect(() => {
    setStars(
      document.querySelectorAll(
        ".star__orbit.star__orbit--activity-inactive , .star__orbit.star__orbit--activity-active"
      )
    );
  }, [activeSystemsId]);

  useEffect(() => {
    setStarsActivity({
      stars,
      activeSystemsId,
    });
  }, [stars, activeSystemsId]);

  useEffect(() => {
    setUserProgressOnLastChosenStar(
      isChosenStarClosed({
        userProgress,
        lastChosenStar,
      })
    );
  }, [lastChosenStar.systemId]);

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const targetId = currentTarget.getAttribute(DATA_PLANET_ID);
    const childrenList = currentTarget.getAttribute(DATA_PLANET_CHILDREN_LIST);
    const parentsList = currentTarget.getAttribute(DATA_PLANET_PARENT_LIST);
    const planetProgressType = currentTarget.getAttribute(
      DATA_PLANET_PROGRESS_TYPE
    );

    addActivePlanet({
      activePlanetId: targetId,
      setActivePlanets: setActiveSystemsId,
    });

    if (
      planetProgressType === PlanetProgressTypes.SYSTEM_OPEN ||
      planetProgressType === PlanetProgressTypes.SYSTEM_EDUCATION
    ) {
      showPlanetsChildren({
        childrenList,
        currentTarget,
        planetWidth: galaxyOrbitSettings.planetWidth,
        planetHeight: galaxyOrbitSettings.planetHeight,
        svgContainer,
        setActivePlanets: setActiveSystemsId,
      });
    }

    if (planetProgressType === PlanetProgressTypes.SYSTEM_CLOSE) {
      showPlanetsParents({
        parentsList,
        currentTarget,
        planetWidth: galaxyOrbitSettings.planetWidth,
        planetHeight: galaxyOrbitSettings.planetHeight,
        svgContainer,
        setActivePlanets: setActiveSystemsId,
      });
    }
  };

  const handlePlanetMouseLeave = () => {
    setActiveSystemsId([]);

    deleteAllConnectionLines({
      svgContainer,
    });
  };

  const handlePlanetClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const targetId = Number(currentTarget.getAttribute(DATA_PLANET_ID));

    setLastChosenStar(DEFAULT_CHOSEN_STAR);

    dispatch(showModal());

    fetchSystemById({
      id: targetId,
    }).then((response) => {
      if (response === undefined) {
        return setLastChosenStar({
          ...DEFAULT_CHOSEN_STAR,
          systemName: "Not found.",
        });
      }

      setLastChosenStar(response.data);
    });
  };

  return (
    <div
      className={block()}
      style={{
        width: width,
        height: height,
      }}
    >
      <Modal
        name={lastChosenStar.systemName}
        locked={userProgressOnLastChosenStar}
      >
        <MmtTabs list={TABS_LIST}>
          <TabPanel>Контент 1</TabPanel>
          <TabPanel>Контент 2</TabPanel>
          <TabPanel>Контент 3</TabPanel>
        </MmtTabs>
      </Modal>
      <div
        className={element("background")}
        style={{
          width: galaxyOrbitSettings.width,
          height: galaxyOrbitSettings.height,
        }}
      />
      {orbitList.map((orbits) => {
        galaxyOrbitSettings.width -= orbitWidthStep;
        galaxyOrbitSettings.height -= orbitHeightStep;

        return (
          <Orbit
            key={orbits.orbitId}
            userProgress={userProgress}
            systemList={orbits.systemList}
            orbitWidth={galaxyOrbitSettings.width}
            orbitHeight={galaxyOrbitSettings.height}
            planetStyle={{
              width: galaxyOrbitSettings.planetWidth + "px",
              height: galaxyOrbitSettings.planetHeight + "px",
            }}
            handlePlanetClick={handlePlanetClick}
            handlePlanetMouseEnter={handlePlanetMouseEnter}
            handlePlanetMouseLeave={handlePlanetMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default Galaxy;
