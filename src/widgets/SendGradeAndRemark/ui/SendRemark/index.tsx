import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Textarea } from '@shared/ui/Textarea';

export const SendRemark = () => {
    const [block, element] = bem('send-remark');

    return (
        <div className={block()}>
            <form>
                <Typography variant={typographyVariant.h1} className={element('title')}>
                    Написать замечание
                </Typography>

                <Textarea fullwidth />

                <Button
                    type="submit"
                    title={'Отправить'}
                    size={buttonSize.small}
                    color={buttonColor.filled}
                />
            </form>

        </div>
    );
};