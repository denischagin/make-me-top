import { TypographyInterface } from "./interfaces";
import "./styles.scss";

export const Typography = (props: TypographyInterface) => {
  const getTypographyClass = (variant: string) => {
    if (variant === "h2") {
      return "typography typography--h2";
    }

    if (variant === "medium16") {
      return "typography typography--medium16";
    }

    if (variant === "medium14") {
      return "typography typography--medium14";
    }

    if (variant === "regular16") {
      return "typography typography--regular16";
    }

    if (variant === "regular14") {
      return "typography typography--regular14";
    }

    return "typography typography--h1";
  };

  return (
    <div className={getTypographyClass(props.variant)}>{props.children}</div>
  );
};
