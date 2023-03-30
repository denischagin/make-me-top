import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/global-fonts.css';
import { RouterProvider } from "react-router-dom";
import { router } from './app/providers/router';
import store from './app/providers/store/index'
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
