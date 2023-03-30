import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { PlanetInput } from "../../shared/buttons/planetInput/input";
import { PlanetButton } from "../../shared/buttons/planetButton/button";
import { selectIsUserRegistered } from "../../entities/user/model";

import "./styles.scss"

export const Registration = () => {
  const dispatch = useDispatch()

  return (
    <>
      <div className="registration">
        <p className="registration__heading">Регистрация</p>
        <PlanetInput placeholder="Имя пользователя *"/>
        <PlanetInput placeholder="Пароль *"/>
        <PlanetInput placeholder="Пароль ещё раз *"/>
        <Link to="/explorer" style={{textDecoration: "none"}}>
          <PlanetButton action={() => console.log("registered")} title="Регистрация" />
        </Link>
        <div className="registration__hint">
          У меня есть аккаунт. <span className="registration__hint-login" onClick={() => dispatch(selectIsUserRegistered())}>Войти</span>
        </div>
      </div>
    </>
  );
}
