import { ButtonInterface, buttonColor } from '@shared/ui/Button/interfaces';

export interface GetSendButtonPropsParams {
    activeTab: number;
    setActiveTab: (activeTab: number) => void;
    keepersListIsEmpty: boolean;
    handleSendApplication: () => void;
}

export const getSendButtonProps = ({
    activeTab,
    handleSendApplication,
    keepersListIsEmpty,
    setActiveTab,
}: GetSendButtonPropsParams) => {
    const sendButtonProps: Pick<
        ButtonInterface,
        'color' | 'onClick' | 'title'
    > = {
        color:
            keepersListIsEmpty && activeTab === 2
                ? buttonColor.primary500
                : buttonColor.filled,

        onClick:
            activeTab === 2 ? handleSendApplication : () => setActiveTab(2),
        title:
            keepersListIsEmpty && activeTab === 2
                ? 'Выберите хранителей'
                : 'Отправить заявку',
    };
    return sendButtonProps;
};
