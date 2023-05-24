import { ReactComponent as ExitIcon } from "@shared/images/exit.svg";
import { ReactComponent as Logo } from "@shared/images/logo.svg";

import { bem } from "@shared/utils/bem";

import { URL_DEFAULT } from "@shared/constants/links";

import { RouterLink } from "@shared/Link";

import { HeaderInterface, HeaderLinkInterface } from "./interfaces";

import "./styles.scss";

export const Header = (props: HeaderInterface) => {
  const {
    links
  } = props;

  const [block, element] = bem("header");

  return (
    <div className={block("container-xxl")}>
      <Logo className={element("logo")}/>
      <div className={element("links")}>
        {
          links.map((item: HeaderLinkInterface) => (
            <RouterLink
              path={item.link}
              key={item.text}
            >
              <span className={element("link")}>
                {item.text}
                {
                  item.link === URL_DEFAULT &&
                  <ExitIcon className={element("icon")}/>
                }
              </span>
            </RouterLink>
          ))
        }
      </div>
    </div>
  );
};
