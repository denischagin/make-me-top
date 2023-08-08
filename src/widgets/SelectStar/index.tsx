import { useNavigate } from 'react-router';

import { Button } from '@shared/Button';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { URL_GALAXY } from '@shared/constants/links';

import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';


export const SelectStar = () => {
    const [block, element] = bem('select-star');

    const navigate = useNavigate();

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Текущая звезда
            </Typography>
            <Button
                size={buttonSize.large}
                title="Выбрать звезду"
                color={buttonColor.filled}
                onClick={() => {
                    return navigate(URL_GALAXY);
                }}
            />
        </div>
    );
};
