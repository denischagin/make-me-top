import { bem } from '@shared/utils';
import { Typography } from '@shared/ui/Typography';
import { ShowUserInfoItemProps } from '@features/show-user-info/ui/ShowUserInfoItem/interface';
import { typographyColor } from '@shared/ui/Typography/interfaces';
import { SHOW_USER_INFO_BLOCK } from '@features/show-user-info/constants';

export const ShowUserInfoItem = (props: ShowUserInfoItemProps) => {
    const { text, renderIcon, href, notInfoText = 'Нет информации' } = props;
    const [blockModalInfo, elementModalInfo] = bem(SHOW_USER_INFO_BLOCK);

    return (
        <Typography
            className={elementModalInfo('item')}
            color={typographyColor.black}
            as='a'
            href={href}
            underline={false}
        >
            {renderIcon(elementModalInfo('icon'))}

            <Typography
                as='span'
                color={typographyColor.black}
            >
                {text ?? notInfoText}
            </Typography>
        </Typography>
    );
};