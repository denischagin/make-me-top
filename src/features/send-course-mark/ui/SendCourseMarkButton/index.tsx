import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { useSendCourseMarkMutation } from '@entities/course';
import { SendCourseMarkButtonProps } from './interface';

export const SendCourseMarkButton = ({ valueMark, explorerId }: SendCourseMarkButtonProps) => {
    const [sendMark] = useSendCourseMarkMutation();

    const handleClickSendMark = () => {
        sendMark({
            explorerId,
            value: valueMark,
        });
    };

    return (
        <Button
            title={'Принять'}
            size={buttonSize.small}
            color={buttonColor.filled}
            onClick={handleClickSendMark}
        />
    );
};
