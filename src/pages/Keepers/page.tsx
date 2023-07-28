import { BackgroundUsersList } from '@shared/BackgroundUsersList';

import { bem } from '@shared/utils/bem';

import { Header } from '@widgets/Header';

import './styles.scss';

export const Keepers = () => {
    const [block, element] = bem('keepers');

    return (
        <div className={block()}>
            <BackgroundUsersList />
            <Header />
        </div>
    );
};
