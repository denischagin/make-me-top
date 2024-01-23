import { Button } from '@shared/ui/Button';
import { useSendCourseMarkMutation } from '@entities/course';
import { SendCourseMarkButtonProps } from './interface';

export const SendCourseMarkButton = ({ valueMark, explorerId, ...restProps }: SendCourseMarkButtonProps) => {
    const [sendMark] = useSendCourseMarkMutation();

    const handleClickSendMark = () => {
        sendMark({
            explorerId,
            value: valueMark,
        });
    };

    return (
        <Button
            {...restProps}
            onClick={handleClickSendMark}
        />
    );
};
