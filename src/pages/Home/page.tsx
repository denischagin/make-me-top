import { useAppSelector } from "@app/providers/store/hooks";

import { isCuratorSelector } from "@entities/curator/model/selectors";
import { isExplorerSelector } from "@entities/explorer/model/selectors";

import { BackgroundHome } from "@shared/BackgroundHome";

import { ReactComponent as MakeMeTopIcon } from "@shared/images/make-me-top.svg";

import { bem } from "@shared/utils/bem";

import { Login } from "@widgets/Login";
import { Registration } from "@widgets/Registration";
import { SelectRole } from "@widgets/SelectRole";

import "./styles.scss";

export const Home = () => {
  const [block, element] = bem("home");

  const explorer = useAppSelector(isExplorerSelector);
  const curator = useAppSelector(isCuratorSelector);
  const user = useAppSelector((state) => state.user.isRegistered);

  const changePlanetAngle = () => {
    if ((curator || explorer) && user) {
      return "rotate(90deg)";
    } else if ((curator || explorer) && !user) {
      return "rotate(-60deg)";
    }
  };

  return (
    <>
      <BackgroundHome />
      <div className={block()}>
        <div
          className={element("planet")}
          style={{ transform: changePlanetAngle() }}
        />
        <div className={element("fields")}>
          <p className={element("heading")}>
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
    </>
  );
};
