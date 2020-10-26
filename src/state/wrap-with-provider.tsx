import React from 'react';
import { Provider } from 'react-redux';
import appStore from './store';

export const wrappedProvider = ({ element }) => {
    return <Provider store={appStore}>{element}</Provider>;
};
