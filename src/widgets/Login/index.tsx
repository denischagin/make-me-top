import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { selectIsUserRegistered } from "@entities/user/model/slice";

import { Input } from "@shared/Input";
import { Typography } from "@shared/Typography";
import { RouterLink } from "@shared/Link";
import { PlanetButton } from "@shared/PlanetButton";

import { bem } from "@shared/utils/bem";

import { URL_CURATOR, URL_EXPLORER } from "@shared/constants/links";

import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

export const Login = () => {
  const [block, element] = bem("login");

  const explorer = useAppSelector((state) => state.explorer.isExplorer);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={block()}>
        <div className={element("heading")}>
          <Typography variant={typographyVariant.h2}>Вход</Typography>
        </div>
        <Input
          placeholder="Номер телефона"
          type="tel"
        />
        <Input
          placeholder="Пароль"
          type="password"
        />
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
          <Typography variant={typographyVariant.regular14}>
            Еще не зарегистрированы? Регистрация
          </Typography>
        </div>
      </div>
    </>
  );
};
