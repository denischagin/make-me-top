import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import Spinner from '@shared/ui/Spinner';

import { bem } from '@shared/utils/helpers/bem';

import { router } from './providers/router';
import store from './providers/store';

import '@app/styles/fonts.scss';
import '@app/styles/global.scss';

export const App = () => {
    const [block, element] = bem('App');

    return (
        <div className={block()}>
            <Provider store={store}>
                <Spinner />
                <Toaster position='top-center' />
                <Suspense fallback={<Spinner loading />}>
                    <RouterProvider router={router} />
                </Suspense>
            </Provider>
        </div>
    );
};
