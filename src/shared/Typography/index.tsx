import { TypographyInterface } from "./interfaces";
import "./styles.scss";

export const Typography = (props: TypographyInterface) => {
  const getTypographyVariant = () => {
    if (props.variant === "h2") {
      return "typography typography--h2";
    }

    if (props.variant === "medium16") {
      return "typography typography--medium16";
    }

    if (props.variant === "medium14") {
      return "typography typography--medium14";
    }

    if (props.variant === "regular16") {
      return "typography typography--regular16";
    }

    if (props.variant === "regular14") {
      return "typography typography--regular14";
    }

    return "typography typography--h1";
  };

  const getTypographyClass = () => {
    if (props.color === "orange") {
      return `${getTypographyVariant()} typography--orange`;
    }

    if (props.color === "black") {
      return `${getTypographyVariant()} typography--black`;
    }

    return getTypographyVariant();
  };

  return (
    <div className={getTypographyClass()}>{props.children}</div>
  );
};
