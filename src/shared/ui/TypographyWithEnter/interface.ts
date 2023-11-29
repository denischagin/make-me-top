import { TypographyInterface } from '@shared/ui/Typography/interfaces';

export interface TypographyWithEnterProps extends Omit<TypographyInterface, 'children'> {
	children?: string;
	withIndent?: boolean;
}