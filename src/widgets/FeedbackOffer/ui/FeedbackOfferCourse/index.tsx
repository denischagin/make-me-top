import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { bem } from '@shared/utils';
import { Stack } from '@shared/ui/Stack';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { FeedbackOfferCard } from '@entities/user';

export const FeedbackOfferCourse = () => {
    const { data: explorerInfo } = useGetExplorerProfileQuery();

    const [block, element] = bem('feedback-offer-course');

    return (
        <Stack className={block()}>
            {explorerInfo?.courseFeedbacks?.map((course) => (
                <FeedbackOfferCard
                    title={`Вам понравился курс?`}
                    heading={course.courseTitle}
                    buttons={(
                        <>
                            <Button title={'Отклонить'} size={buttonSize.small} />

                            <Button
                                title={'Оставить отзыв'}
                                size={buttonSize.small}
                                color={buttonColor.filled}
                            />
                        </>
                    )}
                />
            ))}
        </Stack>
    );
};