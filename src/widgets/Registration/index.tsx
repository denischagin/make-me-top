import { useAppDispatch } from "@app/providers/store/hooks";

import { Input } from "@shared/Input";
import { Typography } from "@shared/Typography";
import { RouterLink } from "@shared/Link";
import { PlanetButton } from "@shared/PlanetButton";
import { URL_EXPLORER } from "@shared/constants/links";
import { bem } from "@shared/utils/bem";

import { selectIsUserRegistered } from "@entities/user/model";

import "./styles.scss";

export const Registration = () => {
  const [block, element] = bem("registration");

  const dispatch = useAppDispatch();

  return (
    <div className={block()}>
      <div className={element("heading")}>
        <Typography variant="h2">Регистрация</Typography>
      </div>
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
          action={() => console.log("registered")}
          title="Регистрация"
        />
      </RouterLink>
      <div
        className={element("hint")}
        onClick={() => dispatch(selectIsUserRegistered())}
      >
        <Typography variant="regular14">У меня есть аккаунт. Войти</Typography>
      </div>
    </div>
  );
};
