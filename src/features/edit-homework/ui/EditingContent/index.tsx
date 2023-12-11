import { Textarea } from '@shared/ui/Textarea';
import { textareaColors, textareaSizes } from '@shared/ui/Textarea/interface';
import { TypographyWithEnter } from '@shared/ui/TypographyWithEnter';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { EditingContentProps } from './interface';
import { Input } from '@shared/ui/Input';

export const EditingContent = ({
                                   isEditing,
                                   editContent,
                                   content,
                                   title,
                                   editTitle,
                                   handleChangeContentField,
                                   handleChangeTitleField,
                               }: EditingContentProps) => {
    return (
        <>
            {isEditing ? (
                <>
                    <Input
                        value={editTitle}
                        onChange={handleChangeTitleField}
                        fullwidth
                        placeholder='Название задания...'
                    />
                    <Textarea
                        color={textareaColors.white}
                        value={editContent}
                        size={content.length > 100 ? textareaSizes.large : textareaSizes.middle}
                        onChange={handleChangeContentField}
                        placeholder='Текст задания...'
                        fullwidth
                    />
                </>
            ) : (
                <>
                    <TypographyWithEnter
                        variant={typographyVariant.medium16}
                        color={typographyColor.black}
                    >
                        {title}
                    </TypographyWithEnter>

                    <TypographyWithEnter
                        variant={typographyVariant.regular16}
                        color={typographyColor.black}
                    >
                        {content}
                    </TypographyWithEnter>
                </>
            )}
        </>
    );
};