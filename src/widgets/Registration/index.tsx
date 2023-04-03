import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectIsUserRegistered } from "@/entities/user/model";
<<<<<<<< HEAD:src/widgets/registration/registration.tsx
import { PlanetButton } from "@/shared/buttons/planetButton/button";
import { PlanetInput } from "@/shared/buttons/planetInput/input";
========
import { PlanetButton } from "@/shared/buttons/PlanetButton";
import { PlanetInput } from "@/shared/PlanetInput";
>>>>>>>> 77371ee7 (MMT-22: сменил названия папок и файлов, все папки компонентов с заглавной буквы, файл компонента index.tsx):src/widgets/Registration/index.tsx

import "./styles.scss";

export const Registration = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="registration">
        <p className="registration__heading">Регистрация</p>
        <PlanetInput placeholder="Имя пользователя *" />
        <PlanetInput placeholder="Пароль *" />
        <PlanetInput placeholder="Пароль ещё раз *" />
        <Link
          to="/explorer"
          style={{ textDecoration: "none" }}
        >
          <PlanetButton
            action={() => console.log("registered")}
            title="Регистрация"
          />
        </Link>
        <div className="registration__hint">
          У меня есть аккаунт.{" "}
          <span
            className="registration__hint-login"
            onClick={() => dispatch(selectIsUserRegistered())}
          >
            Войти
          </span>
        </div>
      </div>
    </>
  );
};
