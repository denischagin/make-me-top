import { useAppSelector } from "@app/providers/store/hooks";

import { bem } from "@shared/utils/bem";
import { Button } from "@shared/Button";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
// import { ReactComponent as LockIcon } from "@shared/images/lock.svg";

import { PlanetListInterface } from "./interfaces";
import { ModalPlanetInterface } from "@entities/explorer/model/interfaces";

import "./styles.scss";

export const PlanetList = (props: PlanetListInterface) => {

  const [block, element] = bem("planet-list");

  const planetList: Array<ModalPlanetInterface> = useAppSelector(
    (state) => state.explorer.planetList
  );

  return (
    <div className={block()}>
      {
        planetList.map((planet: ModalPlanetInterface, index: number) => (
          <div
            key={planet.planetId}
            className={element("item", {
              active: true, // !planet.locked, (установить другой стиль, если планета недоступна)
              current: planet.planetName === props.currentPlanet
            })}
          >
            <span className={element("name")}>
              { ++index }. { planet.planetName }
            </span>
            {/* { planet.locked && <LockIcon className={element("lock-icon")}/> } (Отображение замочка если планета будет недоступна) */}
            {
              planet.planetName === props.currentPlanet &&
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
