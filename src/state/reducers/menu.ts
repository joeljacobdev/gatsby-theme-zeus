import {
    ToggleSideMenu
} from '../actions/constants'

export default (state = {}, action) => {

    if (action.type === ToggleSideMenu) {
        return Object.assign({}, state, { isSideMenuOpened: action.isSideMenuOpened });
    }

    return state;
};
