import { bem } from "@shared/utils/bem";
import { Button } from "@shared/Button";
import { ReactComponent as LockIcon } from "@shared/images/lock.svg";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";

import { PlanetInterface, PlanetListInterface } from "./interfaces";

import "./styles.scss";

export const PlanetList = (props: PlanetListInterface) => {
  const {
    list,
    currentPlanet
  } = props;

  const [block, element] = bem("planet-list");

  return (
    <div className={block()}>
      {
        list.map((planet: PlanetInterface, index) => (
          <div
            key={planet.id}
            className={element("item", {
              active: !planet.locked,
              current: planet.name === currentPlanet
            })}
          >
            <span className={element("name")}>
              { ++index }. { planet.name }
            </span>
            { planet.locked && <LockIcon className={element("lock-icon")}/> }
            {
              planet.name === currentPlanet &&
              <div className={element("info")}>
                <span className={element("item-text")}>Текущая планета</span>
                <Button
                  title="Проверить"
                  size={buttonSize.small}
                  color={buttonColor.primary500}
                />
              </div>
            }
          </div>
        ))
      }
    </div>
  );
};
