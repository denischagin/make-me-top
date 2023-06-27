import { starColor } from "@shared/Star/interfaces";
import { SystemProgressTypes } from "@shared/types/common";

interface getPlanetColorByProgress {
  systemProgressType: string;
}


//функция получения параметра цвета для компонета Star по переданному типу прогресса системы
export const getSystemColorByProgressType = (
  params: getPlanetColorByProgress
) => {
  const { systemProgressType } = params;

  switch (systemProgressType) {
    case SystemProgressTypes.SYSTEM_OPEN: {
      return starColor.white;
    }
    case SystemProgressTypes.SYSTEM_CLOSE: {
      return starColor.black;
    }
    case SystemProgressTypes.SYSTEM_EDUCATION: {
      return starColor.primary500;
    }
    case SystemProgressTypes.PROGRESS_NOT_FOUND: {
      return starColor.black;
    }
    default: {
      return starColor.black;
    }
  }
};