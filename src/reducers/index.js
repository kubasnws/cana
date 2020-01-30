import {
    FETCH_SUCCESS,
    INSTA_SUCCESS,
} from "../actions";

const initialState = [];

const routeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            // console.log('test');
            return {
                ...state,
                [action.payload.itemType]: [...action.payload.data]
            }
        case INSTA_SUCCESS:
            // console.log('test2');
            return {
                ...state,
                insta: [...action.payload.instaData]
            }
        default:
            break;
    }
    return state;
}

export default routeReducer;