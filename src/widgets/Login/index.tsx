import { useAppDispatch, useAppSelector } from "@app/providers/store/hooks";

import { selectIsUserRegistered } from "@entities/user/model/slice";
import { isExplorerSelector } from "@entities/explorer/model/selectors";

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

  const isExplorer = useAppSelector(isExplorerSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={block()}>
        <Typography
          className={element("heading")}
          variant={typographyVariant.h2}
        >
          Вход
        </Typography>
        <Input
          placeholder="Номер телефона"
          type="tel"
        />
        <Input
          placeholder="Пароль"
          type="password"
        />
        <RouterLink path={isExplorer ? URL_EXPLORER : URL_CURATOR}>
          <PlanetButton
            onClick={() => console.log("logged")}
            title="Войти"
          />
        </RouterLink>
        <Typography
          variant={typographyVariant.regular14}
          className={element("hint")}
          onClick={() => dispatch(selectIsUserRegistered())}
        >
          Еще не зарегистрированы? Регистрация
        </Typography>
      </div>
    </>
  );
};
