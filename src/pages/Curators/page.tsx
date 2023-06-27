import { BackgroundUsersList } from '@shared/BackgroundUsersList';

import { bem } from '@shared/utils/bem';

import { Header } from '@widgets/Header';

import './styles.scss';

export const Curators = () => {
    const [block, element] = bem('curators');

    return (
        <div className={block()}>
            <BackgroundUsersList />
            <Header />
        </div>
    );
};
