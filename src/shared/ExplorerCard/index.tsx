import { bem } from "@shared/utils/bem";

import { Avatar } from "@shared/Avatar";
import { avatarSize } from "@shared/Avatar/interfaces";
import { ReactComponent as ArrowIcon } from "@shared/images/small-arrow.svg";
import { ExplorerCardInterface } from "@shared/types/common";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";

import "./styles.scss";

export const ExplorerCard = (props: ExplorerCardInterface) => {
  const {
    name,
    avatar
  } = props;
  const [block, element] = bem("explorer-card");

  return (
    <div className={block()}>
      <Avatar
        size={avatarSize.small}
        image={avatar}
      />
      <Typography variant={typographyVariant.regular14}>
        <span className={element("name")}>{ name }</span>
      </Typography>
      <ArrowIcon className={element("icon")}/>
    </div>
  );
};
