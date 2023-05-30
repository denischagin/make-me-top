import { useAppDispatch } from "@app/providers/store/hooks";

import { selectIsUserRegistered } from "@entities/user/model/slice";

import { RouterLink } from "@shared/Link";
import { Input } from "@shared/Input";
import { Typography } from "@shared/Typography";
import { PlanetButton } from "@shared/PlanetButton";

import { bem } from "@shared/utils/bem";

import { URL_EXPLORER } from "@shared/constants/links";

import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

export const Registration = () => {
  const [block, element] = bem("registration");

  const dispatch = useAppDispatch();

  return (
    <div className={block()}>
      <Typography
        className={element("heading")}
        variant={typographyVariant.h2}
      >
        Регистрация
      </Typography>
      <Input placeholder="Имя пользователя *" />
      <Input
        placeholder="Пароль *"
        type="password"
      />
      <Input
        placeholder="Пароль ещё раз *"
        type="password"
      />
      <RouterLink path={URL_EXPLORER}>
        <PlanetButton
          onClick={() => console.log("registered")}
          title="Регистрация"
        />
      </RouterLink>
      <Typography
        className={element("hint")}
        onClick={() => dispatch(selectIsUserRegistered())}
        variant={typographyVariant.regular14}
      >
        У меня есть аккаунт. Войти
      </Typography>
    </div>
  );
};
