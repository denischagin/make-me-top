import { TypographyAsParagraphProps } from '@shared/ui/Typography/ui';

export interface TypographyWithEnterProps extends Omit<TypographyAsParagraphProps, 'children'> {
    children?: string;
    withIndent?: boolean;
}