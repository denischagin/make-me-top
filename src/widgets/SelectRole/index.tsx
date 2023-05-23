import { useAppDispatch } from "@app/providers/store/hooks";

import { selectRoleAsExplorer } from "@entities/explorer/model/slice";

import { selectRoleAsCurator } from "@entities/curator/model";

import { PlanetButton } from "@shared/PlanetButton";

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
