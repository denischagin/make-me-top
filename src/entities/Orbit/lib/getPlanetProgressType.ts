import { PlanetProgressTypes } from "@shared/types/common";

import { SystemType } from "@entities/Galaxy/model/types";
import { UserProgress } from "@entities/user/model/types";

interface IGetPlanetProgress {
  planet: SystemType;
  userProgress: UserProgress;
}

export const getPlanetProgressType = (params: IGetPlanetProgress) => {
  const { planet, userProgress } = params;

  const isSystemOpen = userProgress.openSystemList.some(
    (openSystemId) => openSystemId === planet.systemId
  );

  if (isSystemOpen) {
    return PlanetProgressTypes.SYSTEM_OPEN;
  }

  const isSystemClose = userProgress.closeSystemList.some(
    (closeSystemId) => closeSystemId === planet.systemId
  );

  if (isSystemClose) {
    return PlanetProgressTypes.SYSTEM_CLOSE;
  }

  const isSystemEducation = userProgress.educationSystemList.some(
    (educationSystemId) => educationSystemId.systemId === planet.systemId
  );

  if (isSystemEducation) {
    return PlanetProgressTypes.SYSTEM_EDUCATION;
  }

  return PlanetProgressTypes.PROGRESS_NOT_FOUND;
};
