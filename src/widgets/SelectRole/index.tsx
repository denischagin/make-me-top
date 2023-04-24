import { useAppDispatch } from "@app/providers/store/hooks";

import { PlanetButton } from "@shared/PlanetButton";

import { selectRoleAsCurator } from "@entities/curator/model";
import { selectRoleAsExplorer } from "@entities/explorer/model";

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
