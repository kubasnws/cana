import axios from 'axios';
import { backendBaseUrl, lang } from '../components/usefullVariables';

let baseUrl = 'http://cana.snwsprodukcja71.pl';
switch (lang) {
    case 'pl':
        baseUrl = `${backendBaseUrl}`;
        break;
    case 'en':
        baseUrl = `${backendBaseUrl}/en`;
        break;
    default:
        break;
}

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchItems = () => (dispatch, getState) => {
    dispatch({ type: FETCH_REQUEST });
    console.log(getState());
    if (getState().prodData) return getState()

    return axios
        .get(`${baseUrl}/wp-json/wp/v2/products`,
            {

            })
        .then(payload => {
            // console.log(payload);
            dispatch({ type: FETCH_SUCCESS, payload });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FETCH_FAILURE });
        })
}
