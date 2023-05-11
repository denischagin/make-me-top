import { useAppDispatch } from "@app/providers/store/hooks";

import { PlanetButton } from "@shared/PlanetButton";

import { selectRoleAsCurator } from "@entities/Сurator/model";
import { selectRoleAsExplorer } from "@entities/Explorer/model";

export const SelectRole = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <PlanetButton
        action={() => dispatch(selectRoleAsExplorer())}
        title="Я – исследователь"
      />
      <PlanetButton
        action={() => dispatch(selectRoleAsCurator())}
        title="Я – хранитель"
      />
    </>
  );
};
