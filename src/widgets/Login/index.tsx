import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectIsUserRegistered } from "@/entities/user/model";
<<<<<<<< HEAD:src/widgets/login/login.tsx
import { PlanetButton } from "@/shared/buttons/planetButton/button";
import { PlanetInput } from "@/shared/buttons/planetInput/input";
========
import { PlanetButton } from "@/shared/buttons/PlanetButton";
import { PlanetInput } from "@/shared/PlanetInput";
>>>>>>>> 77371ee7 (MMT-22: сменил названия папок и файлов, все папки компонентов с заглавной буквы, файл компонента index.tsx):src/widgets/Login/index.tsx

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
        <Link
          to={explorer ? "/explorer" : "/curator"}
          style={{ textDecoration: "none" }}
        >
          <PlanetButton
            action={() => console.log("logged")}
            title="Войти"
          />
        </Link>
        <div className="login__hint">
          Еще не зарегистрированы?{" "}
          <span
            className="login__hint-registration"
            onClick={() => dispatch(selectIsUserRegistered())}
          >
            Регистрация
          </span>
        </div>
      </div>
    </>
  );
};
