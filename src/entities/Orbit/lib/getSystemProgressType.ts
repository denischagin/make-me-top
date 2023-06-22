import { SystemProgressTypes } from "@shared/types/common";

import { SystemType } from "@entities/Galaxy/model/types";
import { UserProgress } from "@entities/user/model/types";

interface IGetPlanetProgress {
  system: SystemType;
  userProgress: UserProgress;
}


//функция получения типа прогресса системы по переданной системе и прогрессу пользоватея
export const getSystemProgressType = (params: IGetPlanetProgress) => {
  const { system, userProgress } = params;

  const isSystemOpen = userProgress.openSystemList.some(
    (openSystemId) => openSystemId === system.systemId
  );

  if (isSystemOpen) {
    return SystemProgressTypes.SYSTEM_OPEN;
  }

  const isSystemClose = userProgress.closeSystemList.some(
    (closeSystemId) => closeSystemId === system.systemId
  );

  if (isSystemClose) {
    return SystemProgressTypes.SYSTEM_CLOSE;
  }

  const isSystemEducation = userProgress.educationSystemList.some(
    (educationSystemId) => educationSystemId.systemId === system.systemId
  );

  if (isSystemEducation) {
    return SystemProgressTypes.SYSTEM_EDUCATION;
  }

  return SystemProgressTypes.PROGRESS_NOT_FOUND;
};
