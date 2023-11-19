import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Textarea } from '@shared/ui/Textarea';
import { FormEventHandler, useState } from 'react';

export const SendRemark = () => {
    const [block, element] = bem('send-remark');
    const [remarkValue, setRemarkValue] = useState('');

    const handleSendRemark: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };

    return (
        <div className={block()}>
            <form onSubmit={handleSendRemark}>
                <Typography variant={typographyVariant.h1} className={element('title')}>
                    Написать замечание
                </Typography>

                <Textarea
                    value={remarkValue}
                    onChange={(e) =>
                        setRemarkValue(e.target.value)}
                    fullwidth
                    name="remark"
                />

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