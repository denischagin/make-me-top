import { useAppDispatch } from "@app/providers/store/hooks";

import { PlanetInput } from "@shared/PlanetInput";
import { Typography } from "@shared/Typography";
import { RouterLink } from "@shared/Link";
import { PlanetButton } from "@shared/PlanetButton";
import { URL_EXPLORER } from "@shared/constants/links";
import { typographyVariant } from "@shared/Typography/interfaces";
import { bem } from "@shared/utils/bem";

import { selectIsUserRegistered } from "@entities/user/model/slice";

import "./styles.scss";

export const Registration = () => {
  const [block, element] = bem("registration");

  const dispatch = useAppDispatch();

  return (
    <div className={block()}>
      <div className={element("heading")}>
        <Typography variant={typographyVariant.h2}>Регистрация</Typography>
      </div>
      <PlanetInput placeholder="Имя пользователя *" />
      <PlanetInput placeholder="Пароль *" />
      <PlanetInput placeholder="Пароль ещё раз *" />
      <RouterLink path={URL_EXPLORER}>
        <PlanetButton
          action={() => console.log("registered")}
          title="Регистрация"
        />
      </RouterLink>
      <div
        className={element("hint")}
        onClick={() => dispatch(selectIsUserRegistered())}
      >
        <Typography variant={typographyVariant.regular14}>У меня есть аккаунт. Войти</Typography>
      </div>
    </div>
  );
};
