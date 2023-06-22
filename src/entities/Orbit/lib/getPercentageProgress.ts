import { SystemType } from "@entities/Galaxy/model/types";
import { UserProgress } from "@entities/user/model/types";

interface IGetPercentageProgress {
  planet: SystemType;
  userProgress: UserProgress;
}

//функция получения значния из поля обьекта по индексу
export const getPercentageProgress = (
  params: IGetPercentageProgress
): number => {
  const { planet, userProgress } = params;

  //получение прогресса определенной системы
  const educationSystem = userProgress.educationSystemList.find(
    (educationSystem) => {
      return educationSystem.systemId === planet.systemId;
    }
  );

  //прогресс найденной системы
  return educationSystem?.completed || 0;
};