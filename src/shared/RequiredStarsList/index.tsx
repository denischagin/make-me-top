import { bem } from "@shared/utils/bem";
import { Button } from "@shared/Button";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";

import { RequiredStarsListInterface, RequiredStarInterface } from "./interfaces";

import "./styles.scss";

export const RequiredStarsList = (props: RequiredStarsListInterface) => {
  const {
    list
  } = props;

  const [block, element] = bem("required-list");

  return (
    <div className={block()}>
      {
        list.map((star: RequiredStarInterface) => (
          <div
            key={star.id}
            className={element("item")}
          >
            <div className={element("star")}>
              <StarIcon className={element("star-icon")}/>
              <span className={element("name")}>{ star.name }</span>
            </div>
            <div className={element("info")}>
              <div className={element("button")}>
                <Button
                  size="small"
                  color={ "filled" }
                  title={ "Перейти" }
                />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};
