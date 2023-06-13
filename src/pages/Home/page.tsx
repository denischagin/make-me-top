import { useAppSelector } from "@app/providers/store/hooks";

import { isExplorerSelector } from "@entities/explorer/model/selectors";

import { isCuratorSelector } from "@entities/curator/model/selectors";

import { BackgroundHome } from "@shared/BackgroundHome";

import { ReactComponent as MakeMeTopIcon } from "@shared/images/make-me-top.svg";

import { bem } from "@shared/utils/bem";

import { Login } from "@widgets/Login";
import { SelectRole } from "@widgets/SelectRole";

import "./styles.scss";

export const Home = () => {
  const [block, element] = bem("home");

  const isExplorer = useAppSelector(isExplorerSelector);
  const isCurator = useAppSelector(isCuratorSelector);

  const isRoleSelected = (isExplorer || isCurator);

  return (
    <>
      <BackgroundHome />
      <div className={block()}>
        <div
          className={element("planet", { isRoleSelected })}
        />
        <div className={element("fields")}>
          <p className={element("heading")}>
            <MakeMeTopIcon />
          </p>
          {
            (!isCurator && !isExplorer)
              ? <SelectRole />
              : <Login />
          }
        </div>
      </div>
    </>
  );
};
