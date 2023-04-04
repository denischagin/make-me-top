import { useDispatch } from "react-redux";

import { selectIsUserRegistered } from "@/entities/user/model";
import { PlanetInput } from "@/shared/PlanetInput";
import { RouterLink } from "@/shared/buttons/Link";
import { PlanetButton } from "@/shared/buttons/PlanetButton";

import "./styles.scss";
import { URL_EXPLORER } from "@/shared/constants/links";

export const Registration = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="registration">
        <p className="registration__heading">Регистрация</p>
        <PlanetInput placeholder="Имя пользователя *" />
        <PlanetInput placeholder="Пароль *" />
        <PlanetInput placeholder="Пароль ещё раз *" />
        <RouterLink path={URL_EXPLORER}>
          <PlanetButton
            action={() => console.log("registered")}
            title="Зарегистрироваться"
          />
        </RouterLink>
        <div
          className="registration__hint"
          onClick={() => dispatch(selectIsUserRegistered())}
        >
          У меня есть аккаунт. Войти
        </div>
      </div>
    </>
  );
};
