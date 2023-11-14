export interface ConfirmModalInterface {
	confirmTitle: string;
	confirmDescription?: string;
	rejectButtonTitle: string;
	submitButtonTitle: string;
	onSubmit: () => void;
	onClose: () => void;
	isOpen: boolean;
}
