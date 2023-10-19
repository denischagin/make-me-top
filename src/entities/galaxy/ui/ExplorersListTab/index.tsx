import { DividingLineColor } from "@shared/ui/DividingLine/interfaces";
import { ExplorersListTabProps } from "./interface";
import { DividingLine } from "@shared/ui/DividingLine";
import { CurrentUserItem } from "@entities/user";
import { UsersList } from "@shared/ui/UsersList";
import { Typography } from "@shared/ui/Typography";
import { typographyColor, typographyVariant } from "@shared/ui/Typography/interfaces";

export const ExplorersListTab = ({ courseInfo }: ExplorersListTabProps) => {
  return (
    <>
      {!!courseInfo?.you && (
        <>
          <CurrentUserItem explorer={courseInfo.you} badgeTitle="Мой рейтинг" />
          <DividingLine color={DividingLineColor.gray500} />
        </>
      )}
      {courseInfo?.explorers?.length !== 0 ? (
        <UsersList explorersList={courseInfo?.explorers} />
      ) : (
        <Typography
          variant={typographyVariant.medium16}
          color={typographyColor.black}
        >
          У данного курса нет исследователей
        </Typography>
      )}
    </>
  );
};