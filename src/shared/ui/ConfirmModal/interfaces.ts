export interface ConfirmModalInterface {
    confitmTitle: string;
    rejectButtonTitle: string;
    submitButtonTitle: string;
    onSubmit: () => void;
    onClose: () => void;
    isOpen: boolean;
}
