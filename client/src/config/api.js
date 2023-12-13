import axios from'axios'


export const BASE_URL = 'http://localhost:4000/';

export const postAPIsignIn = async (api , data) => {
    try {
        const res = await axios.post(BASE_URL+api , data )
        return res
    } catch (error) {
        console.log(error);
        throw error;
    }
}