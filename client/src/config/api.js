import axios from 'axios'
import Cookies from 'js-cookie';
import { instance } from './axios';


export const BASE_URL = 'http://localhost:4000/';

export const postAPIsignIn = async (api, data) => {
    return instance.post(BASE_URL + api, data)
}


export const getAPI = function (url) {
    let cookie = Cookies.get('TravelAccount');
    return instance.get(url, { headers: { Authorization: cookie } })
}

export const postAPI = function (url, data) {
    let cookie = Cookies.get('TravelAccount');
    return instance.post(url, data, { headers: { Authorization: cookie } })
}

export const patchAPI = function (url, data) {
    let cookie = Cookies.get('TravelAccount');
    return instance.patch(url, data, { headers: { Authorization: cookie } })
}