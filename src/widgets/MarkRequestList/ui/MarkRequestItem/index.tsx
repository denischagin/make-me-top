import { SendCourseMarkButton } from '@features/send-course-mark';
import { CardWithExtraButton } from '@shared/ui/CardWithExtraButton';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem, getUserFullName } from '@shared/utils';
import { MarkRequestItemProps } from '@widgets/MarkRequestList/ui/MarkRequestItem/interface';
import './styles.scss';
import { Textarea } from '@shared/ui/Textarea';
import { ChangeEventHandler, useState } from 'react';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

export const MarkRequestItem = (props: MarkRequestItemProps) => {
    const {
        courseTitle,
        currentMark,
        currentExplorerId,
        handleChangeMark,
        handleChangeExplorer,
        ...markRequestRest
    } = props;
    const [block, element] = bem('mark-request-item');
    const [markComment, setMarkComment] = useState('');

    const active = currentExplorerId === markRequestRest.explorerId;

    const handleClickChangeExplorer = () => {
        handleChangeExplorer(active ? null : markRequestRest.explorerId);
    };

    const handleChangeMarkComment: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setMarkComment(e.target.value);
    };

    return (
        <div className={block()}>
            <CardWithExtraButton
                fullName={getUserFullName(markRequestRest)}
                active={active}
                content={
                    <div>
                        <Typography variant={typographyVariant.regular14}>
                            {`Система: ${courseTitle}`}
                        </Typography>
                    </div>
                }
                buttonContent={active ? 'Отменить' : 'Оценить'}
                onButtonClick={handleClickChangeExplorer}
            />
            {active && (
                <div className={element('mark-wrapper')}>
                    <Textarea
                        value={markComment}
                        onChange={handleChangeMarkComment}
                        placeholder='Комментарий к оценке'
                        fullwidth
                    />

                    {markComment !== "" && (
                        <SendCourseMarkButton
                            explorerId={markRequestRest.explorerId}
                            title={'Принять'}
                            size={buttonSize.large}
                            color={buttonColor.filled}
                            valueMark={currentMark ?? 100} // TODO: переделать кнопку
                        />
                    )}
                </div>
            )}
        </div>
    );
};
