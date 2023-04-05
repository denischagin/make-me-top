import { useAppSelector } from "@/app/providers/store/hooks";
import { ReactComponent as MakeMeTopIcon } from "@/shared/images/make-me-top.svg";
import { Login } from "@/widgets/Login";
import { Registration } from "@/widgets/Registration";
import { SelectRole } from "@/widgets/SelectRole";

import "./styles.scss";

export const Home = () => {
  const explorer = useAppSelector((state) => state.explorer.isExplorer);
  const curator = useAppSelector((state) => state.curator.isCurator);
  const user = useAppSelector((state) => state.user.isRegistered);

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
      <div className="home__fields">
        <p className="home__fields-heading">
          <MakeMeTopIcon />
        </p>
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
