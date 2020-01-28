import axios from 'axios';
import { backendBaseUrl, lang, instaToken } from '../components/usefullVariables';

let baseUrl = backendBaseUrl;
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

export const INSTA_REQUEST = 'INSTA_REQUEST';
export const INSTA_SUCCESS = 'INSTA_SUCCESS';
export const INSTA_FAILURE = 'INSTA_FAILURE';

export const fetchItems = (link, itemType) => (dispatch, getState) => {
    dispatch({ type: FETCH_REQUEST });
    if (itemType in getState()) return

    return axios
        .get(`${baseUrl}${link}`)
        .then(({ data }) => {
            data = Array.isArray(data) ? data : [data];
            dispatch({
                type: FETCH_SUCCESS, payload: {
                    data,
                    itemType
                }
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: FETCH_FAILURE });
        })
}

export const fetchInsta = () => (dispatch, getState) => {
    dispatch({ type: INSTA_REQUEST });
    if ('insta' in getState()) return

    const num_photos = 6;
    const instaLink = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${instaToken}&count=${num_photos}`;

    return axios
        .get(instaLink)
        .then(({ data }) => {
            const instaData = data.data;
            dispatch({
                type: INSTA_SUCCESS, payload: {
                    instaData
                }
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: INSTA_FAILURE });
        })
}

