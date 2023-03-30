import { useDispatch } from 'react-redux'

import { PlanetButton } from "../../shared/buttons/planetButton/button";
import { selectRoleAsExplorer } from "../../entities/explorer/model";
import { selectRoleAsCurator } from "../../entities/curator/model";

export const SelectRole = () => {
  const dispatch = useDispatch()

  return (
    <>
      <PlanetButton action={() => dispatch(selectRoleAsExplorer())} title="Я – исследователь"/>
      <PlanetButton action={() => dispatch(selectRoleAsCurator())} title="Я – хранитель"/>
    </>
  );
}
