import { useAppSelector } from "@app/providers/store/hooks";

import { explorerIsExplorerSelector } from "@entities/explorer/model/selectors";

import { curatorIsCuratorSelector } from "@entities/curator/model/selectors";

import { BackgroundHome } from "@shared/BackgroundHome";

import { ReactComponent as MakeMeTopIcon } from "@shared/images/make-me-top.svg";

import { bem } from "@shared/utils/bem";

import { Login } from "@widgets/Login";
import { SelectRole } from "@widgets/SelectRole";

import "./styles.scss";

export const Home = () => {
  const [block, element] = bem("home");

  const isExplorer = useAppSelector(explorerIsExplorerSelector);
  const isCurator = useAppSelector(curatorIsCuratorSelector);

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
