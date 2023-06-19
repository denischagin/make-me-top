import { bem } from '@shared/utils/bem';

export const App = () => {
    const [block, element] = bem('App');

    return <div className={block()}></div>;
};
