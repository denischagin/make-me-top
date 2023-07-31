import { ModalAlertVariants } from '@shared/ModalAlert/interfaces';

export function getModalTitleByVariant(param: ModalAlertVariants): string {
    switch (param) {
        case ModalAlertVariants.choseKeeper: {
            return 'Для изучения данной звезды, выберите хранителя и отправьте заявку';
        }
        case ModalAlertVariants.needAnotherSystem: {
            return 'Для изучения данной звезды, необходимы знания о звездах:';
        }
        default: return 'Alert variant not found';
    }
}