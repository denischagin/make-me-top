import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { PlanetInput } from "@shared/PlanetInput";
import { Typography } from "@shared/Typography";
import { RouterLink } from "@shared/buttons/Link";
import { PlanetButton } from "@shared/buttons/PlanetButton";
import { URL_CURATOR, URL_EXPLORER } from "@shared/constants/links";
import { bem } from "@shared/utils/bem";

import { selectIsUserRegistered } from "@entities/user/model";

import "./styles.scss";

export const Login = () => {
  const [block, element] = bem("login");

  const explorer = useAppSelector((state) => state.explorer.isExplorer);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={block()}>
        <div className={element("heading")}>
          <Typography variant="h2">Вход</Typography>
        </div>
        <PlanetInput placeholder="Номер телефона" />
        <PlanetInput placeholder="Пароль" />
        <RouterLink path={explorer ? URL_EXPLORER : URL_CURATOR}>
          <PlanetButton
            action={() => console.log("logged")}
            title="Войти"
          />
        </RouterLink>
        <div
          className={element("hint")}
          onClick={() => dispatch(selectIsUserRegistered())}
        >
          <Typography variant="regular14">
            Еще не зарегистрированы? Регистрация
          </Typography>
        </div>
      </div>
    </>
  );
};
