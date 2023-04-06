import { useAppDispatch } from "@app/providers/store/hooks";

import { PlanetInput } from "@shared/PlanetInput";
import { Typography } from "@shared/Typography";
import { RouterLink } from "@shared/buttons/Link";
import { PlanetButton } from "@shared/buttons/PlanetButton";
import { URL_EXPLORER } from "@shared/constants/links";

import { selectIsUserRegistered } from "@entities/user/model";

import "./styles.scss";

export const Registration = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="registration">
        <div className="registration__heading">
          <Typography variant="h2">Регистрация</Typography>
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
          className="registration__hint"
          onClick={() => dispatch(selectIsUserRegistered())}
        >
          <Typography variant="regular14">
            У меня есть аккаунт. Войти
          </Typography>
        </div>
      </div>
    </>
  );
};
