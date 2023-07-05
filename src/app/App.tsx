import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { bem } from '@shared/utils/bem';

import { router } from './providers/router';
import store from './providers/store';

import '@app/styles/fonts.scss';
import '@app/styles/global.scss';

export const App = () => {
    const [block, element] = bem('App');

    return (
        <div className={block()}>
            <Provider store={store}>
                <Toaster position='top-center' />
                <RouterProvider router={router} />
            </Provider>
        </div>
    );
};
