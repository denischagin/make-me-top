import { ModalAlertVariants } from '@shared/ModalAlert/interfaces';

export function getModalTitleByStatus(param: boolean): string {
    switch (param) {
        // ModalAlertVariants.choseKeeper
        case true: {
            return 'Для изучения данной звезды, выберите хранителя и отправьте заявку';
        }

        //ModalAlertVariants.needAnotherSystem
        case false: {
            return 'Для изучения данной звезды, необходимы знания о звездах:';
        }
        default: return 'Alert variant not found';
    }
}