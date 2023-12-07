import { Textarea } from '@shared/ui/Textarea';
import { textareaColors, textareaSizes } from '@shared/ui/Textarea/interface';
import { TypographyWithEnter } from '@shared/ui/TypographyWithEnter';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { EditingContentProps } from './interface';

export const EditingContent = ({ isEditing, editValue, content, handleChangeEditField }: EditingContentProps) => {
    return (
        <>
            {isEditing ? (
                <Textarea
                    color={textareaColors.white}
                    value={editValue}
                    size={content.length > 100 ? textareaSizes.large : textareaSizes.middle}
                    onChange={handleChangeEditField}
                    fullwidth
                />
            ) : (
                <TypographyWithEnter
                    variant={typographyVariant.regular16}
                    color={typographyColor.black}
                >
                    {content}
                </TypographyWithEnter>
            )}
        </>
    );
};