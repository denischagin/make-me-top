import { bem } from "@shared/utils/bem";
import { Button } from "@shared/Button";
import { ReactComponent as LockIcon } from "@shared/images/lock.svg";

import { PlanetInterface, PlanetListInterface } from "./interfaces";
import "./styles.scss";

export const PlanetList = (props: PlanetListInterface) => {
  const [block, element] = bem("planet-list");
  const {
    list,
    currentPlanet
  } = props;

  return (
    <div className={block()}>
      {
        list.map((planet: PlanetInterface, index) => (
          <div
            key={planet.id}
            className={element("item", {
              active: !planet.locked,
              "current-planet": planet.name === currentPlanet
            })}
          >
            <p className={element("name")}>
              { index + 1 }. { planet.name }
            </p>
            { planet.locked && <LockIcon className={element("lock-icon")}/> }
            {
              planet.name === currentPlanet
              && <div className={element("info")}>
                <p className={element("item-text")}>Текущая планета</p>
                <Button
                  title="Проверить"
                  size="small"
                  color="primary-500"
                />
              </div>
            }
          </div>
        ))
      }
    </div>
  );
};
