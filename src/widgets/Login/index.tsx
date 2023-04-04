import { useDispatch, useSelector } from "react-redux";

import { selectIsUserRegistered } from "@/entities/user/model";
import { PlanetInput } from "@/shared/PlanetInput";
import { RouterLink } from "@/shared/buttons/Link";
import { PlanetButton } from "@/shared/buttons/PlanetButton";
import { RootState } from "@/app/providers/store";
import { URL_CURATOR, URL_EXPLORER } from "@/shared/constants/links";

import "./styles.scss";

export const Login = () => {
  const explorer = useSelector(
    (state: RootState) => state.explorerReducer.isExplorer
  );
  const dispatch = useDispatch();

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
