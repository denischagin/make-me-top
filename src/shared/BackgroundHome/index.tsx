import { useAppSelector } from "@app/providers/store/hooks";

import { bem } from "@shared/utils/bem";

import { ShiningStar } from "@shared/ShiningStar";

import "./styles.scss";

export const BackgroundHome = () => {
  const [block, element] = bem("background-home");

  const explorer = useAppSelector((state) => state.explorer.isExplorer);
  const curator = useAppSelector((state) => state.curator.isCurator);
  const user = useAppSelector((state) => state.user.isRegistered);

  const isLogin = (curator || explorer) && user;
  const isRegistration = (curator || explorer) && !user;

  const ChangeFirstNebulaPosition = () => {
    if (isLogin) {
      return "translate(0, -400px)";
    } else if (isRegistration) {
      return "translate(800px, -300px)";
    }
  };

  const ChangeSecondNebulaPosition = () => {
    if (isLogin) {
      return "translate(0, -400px)";
    } else if (isRegistration) {
      return "translate(0, 0)";
    }
  };

  const ChangeThirdNebulaPosition = () => {
    if (isLogin) {
      return "translate(0, 450px)";
    } else if (isRegistration) {
      return "translate(-300px, 0)";
    }
  };

  return (
    <div className={block()}>
      <div className={element("static-bg")} />
      <div className={element("star-first")}>
        <ShiningStar size="small" />
      </div>
      <div className={element("star-second")}>
        <ShiningStar size="small" />
      </div>
      <div className={element("star-third")}>
        <ShiningStar />
      </div>
      <div className={element("star-fourth")}>
        <ShiningStar />
      </div>
      <div className={element("star-fifth")}>
        <ShiningStar size="small" />
      </div>
      <div className={element("noice")} />
      <div
        className={element("nebula-first")}
        style={{ transform: ChangeFirstNebulaPosition() }}
      />
      <div
        className={element("nebula-second", { moved: isRegistration })}
        style={{ transform: ChangeSecondNebulaPosition() }}
      />
      <div
        className={element("nebula-third")}
        style={{ transform: ChangeThirdNebulaPosition() }}
      />
    </div>
  );
};
