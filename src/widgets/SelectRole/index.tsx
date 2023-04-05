import { useAppDispatch } from "@/app/providers/store/hooks";
import { selectRoleAsCurator } from "@/entities/curator/model";
import { selectRoleAsExplorer } from "@/entities/explorer/model";
import { PlanetButton } from "@/shared/buttons/PlanetButton";

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
