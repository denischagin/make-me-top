import { useSelector } from "react-redux";

import { ReactComponent as MakeMeTopLogo } from "@/shared/images/make-me-top.svg";
import { Login } from "@/widgets/Login";
import { Registration } from "@/widgets/Registration";
import { SelectRole } from "@/widgets/SelectRole";

import "./styles.scss";

export const Home = () => {
  const explorer = useSelector(
    (state: any) => state.explorerReducer.isExplorer
  );
  const curator = useSelector((state: any) => state.curatorReducer.isCurator);
  const user = useSelector((state: any) => state.userReducer.isRegistered);

  const changePlanetAngle = () => {
    if ((curator || explorer) && user) {
      return "rotate(90deg)";
    } else if ((curator || explorer) && !user) {
      return "rotate(-60deg)";
    }
  };

  return (
    <div className="home">
      <div
        className="home__planet"
        style={{ transform: changePlanetAngle() }}
      />
      <div className="home__planet-fields">
        <MakeMeTopLogo className="home__planet-fields-heading" />
        {!curator && !explorer ? (
          <SelectRole />
        ) : user ? (
          <Login />
        ) : (
          <Registration />
        )}
      </div>
    </div>
  );
};
