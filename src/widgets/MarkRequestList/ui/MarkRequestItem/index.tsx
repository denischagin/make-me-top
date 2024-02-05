import { CardWithExtraButton } from '@shared/ui/CardWithExtraButton';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem, getUserFullName } from '@shared/utils';
import { MarkRequestItemProps } from '@widgets/MarkRequestList/ui/MarkRequestItem/interface';
import './styles.scss';
import { Badge } from '@shared/ui/Badge';
import { badgeColor } from '@shared/ui/Badge/interfaces';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { useSendCourseMarkMutation } from '@entities/course';

export const MarkRequestItem = (props: MarkRequestItemProps) => {
    const {
        courseTitle,
        currentMark,
        currentExplorerId,
        handleChangeMark,
        handleChangeExplorer,
        averageMark,
        ...markRequestRest
    } = props;

    const [block, element] = bem('mark-request-item');
    // const [, setMarkComment] = useState('');

    const active = currentExplorerId === markRequestRest.explorerId;

    const [sendMark] = useSendCourseMarkMutation();

    const roundedMark = Math.round(averageMark);

    const handleClickSendMark = () => {
        sendMark({
            explorerId: markRequestRest.explorerId,
            value: roundedMark,
        });
    };

    const handleClickChangeExplorer = () => {
        handleChangeExplorer(active ? null : markRequestRest.explorerId);
    };

    // const handleChangeMarkComment: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    //     setMarkComment(e.target.value);
    // };


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

                        <Typography className={element('mark-text')} variant={typographyVariant.regular14}>
                            Оценка на выставление: {averageMark} <Badge
                            color={badgeColor.primary500}>{roundedMark}</Badge>
                        </Typography>
                    </div>
                }
                buttonContent={active ? 'Отменить' : 'Оценить'}
                onButtonClick={handleClickChangeExplorer}
            />
            <ConfirmModal confirmTitle={`Вы уверены, что хотите выставить оценку ${roundedMark} по курсу?`}
                          rejectButtonTitle={'Нет, не хочу'} submitButtonTitle={'Да, хочу выставить'}
                          onSubmit={handleClickSendMark} onClose={() => handleChangeExplorer(null)} isOpen={active} />
            {/*{active && (*/}
            {/*    <div className={element('mark-wrapper')}>*/}
            {/*        <Textarea*/}
            {/*            value={markComment}*/}
            {/*            onChange={handleChangeMarkComment}*/}
            {/*            placeholder='Комментарий к оценке'*/}
            {/*            fullwidth*/}
            {/*        />*/}

            {/*        <SendCourseMarkButton*/}
            {/*            explorerId={markRequestRest.explorerId}*/}
            {/*            title={'Принять'}*/}
            {/*            size={buttonSize.large}*/}
            {/*            color={buttonColor.filled}*/}
            {/*            valueMark={roundedMark}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};
