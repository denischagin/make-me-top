import { TypographyInterface } from "./interfaces";
import "./styles.scss";

export const Typography = (props: TypographyInterface) => {
  const getTypographyVariant = () => {
    switch (props.variant) {
    case "h1":
      return "typography typography--h1";
    case "h2":
      return "typography typography--h2";
    case "medium16":
      return "typography typography--medium16";
    case "medium14":
      return "typography typography--medium14";
    case "regular16":
      return "typography typography--regular16";
    case "regular14":
      return "typography typography--regular14";
    default:
      return "typography";
    }
  };

  const getTypographyClass = () => {
    switch (props.color) {
    case "primary-500":
      return `${getTypographyVariant()} typography--primary-500`;
    case "black":
      return `${getTypographyVariant()} typography--black`;
    default:
      return getTypographyVariant();
    }
  };

  return (
    <div className={getTypographyClass()}>{props.children}</div>
  );
};
