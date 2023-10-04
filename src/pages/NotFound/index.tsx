import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Container } from '@shared/ui/Container';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { Header } from '@widgets/Header';

import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';

import './style.scss';

const NotFound = ({
}: { errorCode?: number | string }) => {
    const [block, element] = bem('not-found');

    return (
        <>
            <BackgroundProfile />
            <div className={block()}>
                <Header />
                <Container>
                    <div className={element('content')}>
                        <Typography
                            variant={typographyVariant.h1}
                            color={typographyColor.white}
                        >
                            Это еще неизведанная часть космоса
                        </Typography>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default NotFound;
