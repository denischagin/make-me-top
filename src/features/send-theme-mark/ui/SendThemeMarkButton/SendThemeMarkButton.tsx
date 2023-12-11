import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { useSendThemeMarkMutation } from '@entities/theme';
import { useParams } from 'react-router-dom';
import { SendThemeMarkButtonProps } from '@features/send-theme-mark/ui/SendThemeMarkButton/interface';

export const SendThemeMarkButton = ({ value, explorerId }: SendThemeMarkButtonProps) => {
    const [sendThemeMark] = useSendThemeMarkMutation();
    const { themeId } = useParams();

    const handleSendThemeMark = () => {
        if (!themeId || !value || !explorerId)
            return;

        sendThemeMark({
            themeId: themeId!,
            value,
            explorerId,
        });
    };

    return (
        <Button
            title={'Принять'}
            size={buttonSize.small}
            color={buttonColor.filled}
            onClick={handleSendThemeMark}
        />
    );
};