import { RequestStatusType } from '@entities/homework/model/types/api';


export const stringByRequestStatus: Record<RequestStatusType, string> = {
    CHECKING: 'Ждет проверки от хранителя',
    CLOSED: 'Закрыто',
    EDITING: 'Ждет новой версии от исследователя',
};
