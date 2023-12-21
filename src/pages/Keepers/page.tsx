import { Container } from '@shared/ui/Container';
import { bem } from '@shared/utils/helpers/bem';

import { Header } from '@widgets/Header/ui/Header';

import './styles.scss';
import { KeepersInfiniteList } from '@widgets/KeepersInfiniteList';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Stack } from '@shared/ui/Stack';
import { stackSpacing } from '@shared/ui/Stack/interface';

const Keepers = () => {
    const [block, element] = bem('keepers');

    return (
        <div className={block()}>
            <Header />

            <Container className={element('container')}>
                <Stack spacing={stackSpacing.large}>
                    <Typography variant={typographyVariant.h2}>
                        Список хранителей
                    </Typography>

                    <KeepersInfiniteList />
                </Stack>

            </Container>
        </div>
    );
};

export default Keepers;
