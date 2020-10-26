import {createStore} from 'redux';
import {default as menuReducer} from "./reducers/menu";

const initialState = {
    isSideMenuOpened: false,
};

const appStore = createStore(menuReducer, initialState);
export default appStore;
