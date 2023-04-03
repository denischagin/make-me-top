import { useDispatch } from "react-redux";

import { selectRoleAsCurator } from "@/entities/curator/model";
import { selectRoleAsExplorer } from "@/entities/explorer/model";
import { PlanetButton } from "@/shared/buttons/PlanetButton";

export const SelectRole = () => {
  const dispatch = useDispatch();

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
