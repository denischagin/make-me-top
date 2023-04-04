import { useAppDispatch, useAppSelector } from "@/app/providers/store/hooks";
import { selectIsUserRegistered } from "@/entities/user/model";
import { PlanetInput } from "@/shared/PlanetInput";
import { RouterLink } from "@/shared/buttons/Link";
import { PlanetButton } from "@/shared/buttons/PlanetButton";
import { URL_CURATOR, URL_EXPLORER } from "@/shared/constants/links";

import "./styles.scss";

export const Login = () => {
  const explorer = useAppSelector((state) => state.explorer.isExplorer);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="login">
        <p className="login__heading">Вход</p>
        <PlanetInput placeholder="Номер телефона" />
        <PlanetInput placeholder="Пароль" />
        <RouterLink path={explorer ? URL_EXPLORER : URL_CURATOR}>
          <PlanetButton
            action={() => console.log("logged")}
            title="Войти"
          />
        </RouterLink>
        <div
          className="login__hint"
          onClick={() => dispatch(selectIsUserRegistered())}
        >
          Еще не зарегистрированы? Регистрация
        </div>
      </div>
    </>
  );
};
