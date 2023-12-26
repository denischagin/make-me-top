import { Button } from '@shared/ui/Button';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { getSendButtonProps } from '@entities/galaxy/libs/helpers/getSendButtonProps';
import { SendCourseRequestButtonProps } from '@features/send-course-request/ui/SendCourseRequestButton/interface';

export const SendCourseRequestButton = (props: SendCourseRequestButtonProps) => {
    const {
        handleSendApplication,
        keepersListIsEmpty,
        setActiveTab,
        className,
        activeTabIndex,
    } = props;

    const sendButtonProps = getSendButtonProps({
        activeTab: activeTabIndex,
        handleSendApplication,
        keepersListIsEmpty,
        setActiveTab,
    });

    return (
        <Button
            size={buttonSize.large}
            className={className}
            {...sendButtonProps}
        />

    );
};