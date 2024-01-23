import { TypographyAsParagraphProps } from '@shared/ui/Typography/interfaces';

export interface TypographyWithEnterProps extends Omit<TypographyAsParagraphProps, 'children'> {
    children?: string;
    withIndent?: boolean;
}