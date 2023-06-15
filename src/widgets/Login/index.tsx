import { useAppSelector } from "@app/providers/store/hooks";

import { isExplorerSelector } from "@entities/explorer/model/selectors";

import { Input } from "@shared/Input";
import { Typography } from "@shared/Typography";
import { RouterLink } from "@shared/RouterLink";
import { PlanetButton } from "@shared/PlanetButton";

import { bem } from "@shared/utils/bem";

import { URL_CURATOR, URL_EXPLORER } from "@shared/constants/links";

import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

export const Login = () => {
  const [block, element] = bem("login");

  const isExplorer = useAppSelector(isExplorerSelector);

  return (
    <>
      <div className={block()}>
        <Typography
          className={element("heading")}
          variant={typographyVariant.h2}
        >
          Вход
        </Typography>
        <Input
          placeholder="Номер телефона"
          type="tel"
        />
        <Input
          placeholder="Пароль"
          type="password"
        />
        <RouterLink to={isExplorer ? URL_EXPLORER : URL_CURATOR}>
          <PlanetButton
            onClick={() => console.log("logged")}
            title="Войти"
          />
        </RouterLink>
      </div>
    </>
  );
};
