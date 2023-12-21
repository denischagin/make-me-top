import { Container } from '@shared/ui/Container';

import { bem } from '@shared/utils/helpers/bem';

import { Header } from '@widgets/Header/ui/Header';

import './styles.scss';
import { ExplorersInfiniteList } from '@widgets/ExplorersInfiniteList';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Stack } from '@shared/ui/Stack';
import { stackSpacing } from '@shared/ui/Stack/interface';

const Explorers = () => {
    const [block, element] = bem('explorers');

    return (
        <div className={block()}>
            <Header />
            <Container className={element('container')}>
                <Stack spacing={stackSpacing.large}>
                    <Typography variant={typographyVariant.h2}>
                        Список исследователей
                    </Typography>

                    <ExplorersInfiniteList />
                </Stack>
            </Container>
        </div>
    );
};

export default Explorers;
