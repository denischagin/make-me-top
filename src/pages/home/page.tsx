import { useSelector } from 'react-redux'

import { SelectRole } from "../../widgets/selectRole/selectRole";
import { Login } from "../../widgets/login/login";
import { Registration } from "../../widgets/registration/registration";

import "./styles.scss";

export const Home = () => {
  const explorer = useSelector((state: any) => state.explorerReducer.isExplorer)
  const curator = useSelector((state: any) => state.curatorReducer.isCurator)
  const user = useSelector((state: any) => state.userReducer.isRegistered)

  const changePlanetAngle = () => {
    if ((curator || explorer) && user) {
      return "rotate(90deg)";
    } else if ((curator || explorer) && !user) {
      return "rotate(-60deg)";
    }
  }

  console.log(curator);

  return (
    <div className="home">
      <div className="home__planet" style={{transform: changePlanetAngle()}}/>
      <div className="home__planet-fields">
        <p className="home__planet-fields-heading">make me top</p>
        {
          !curator && !explorer
          ? <SelectRole />
          : user
            ? <Login />
            : <Registration />
        }
      </div>
    </div>
  );
}
