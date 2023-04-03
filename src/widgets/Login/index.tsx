import { useDispatch, useSelector } from "react-redux";

import { selectIsUserRegistered } from "@/entities/user/model";
import { PlanetInput } from "@/shared/PlanetInput";
import { RouterLink } from "@/shared/buttons/Link";
import { PlanetButton } from "@/shared/buttons/PlanetButton";

import "./styles.scss";

export const Login = () => {
  const explorer = useSelector(
    (state: any) => state.explorerReducer.isExplorer
  );
  const dispatch = useDispatch();

  return (
    <>
      <div className="login">
        <p className="login__heading">Вход</p>
        <PlanetInput placeholder="Номер телефона" />
        <PlanetInput placeholder="Пароль" />
        <RouterLink path={explorer ? "/explorer" : "/curator"}>
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
