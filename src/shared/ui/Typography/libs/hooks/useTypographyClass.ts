import { bem } from '@shared/utils';
import { TypographyCommonProps } from '@shared/ui/Typography/interfaces';

export type TypographyModifierType = Record<string, boolean | string>

export interface UseTypographyClassArgs extends Pick<Partial<TypographyCommonProps>, 'variant' | 'color'> {
    className?: string,
    modifiers?: TypographyModifierType
}

export const useTypographyClass = ({ className, variant, color, modifiers }: UseTypographyClassArgs): string => {
    const [block] = bem('typography');

    return block(
        {
            color,
            variant,
            ...modifiers,
        },
        className,
    );
};