import {
    FETCH_SUCCESS,
} from "../actions";

const initialState = [];

const routeReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                prodData: action.payload.data
            }
        default:
            break;
    }
    return state;
}

export default routeReducer;