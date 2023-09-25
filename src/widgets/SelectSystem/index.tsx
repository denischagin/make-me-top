import { useNavigate } from 'react-router';

import { Button } from '@shared/ui/Button';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/bem';

import { URL_GALAXY } from '@shared/constants/links';

import {
    buttonColor,
    buttonSize,
} from '@shared/ui/Button/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';

export const SelectSystem = () => {
    const [block, element] = bem('select-system');

    const navigate = useNavigate();

    return (
        <div className={block()}>
            <Typography
                className={element('heading', 'mb-4 mt-5')}
                variant={typographyVariant.h2}
            >
                Текущая система
            </Typography>
            <Button
                size={buttonSize.large}
                title="Выбрать систему"
                color={buttonColor.filled}
                onClick={() => {
                    navigate(URL_GALAXY + '/1');
                }}
            />
        </div>
    );
};
