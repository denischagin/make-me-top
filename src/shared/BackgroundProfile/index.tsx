import { bem } from "@shared/utils/bem";
import { ShiningStar } from "@shared/ShiningStar";

import "./styles.scss";

export const BackgroundProfile = () => {
  const [block, element] = bem("background-profile");

  return (
    <div className={block()}>
      <div className={element("static-bg")} />
      <div className={element("star-first")}>
        <ShiningStar size="small"/>
      </div>
      <div className={element("star-second")}>
        <ShiningStar size="small" />
      </div>
      <div className={element("star-third")}>
        <ShiningStar size="small" />
      </div>
      <div className={element("star-fourth")}>
        <ShiningStar />
      </div>
      <div className={element("star-fifth")}>
        <ShiningStar />
      </div>
      <div className={element("star-sixth")}>
        <ShiningStar />
      </div>
      <div className={element("star-seventh")}>
        <ShiningStar size="small"/>
      </div>
      <div className={element("star-eighth")}>
        <ShiningStar size="small"/>
      </div>
    </div>
  );
};
