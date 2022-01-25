import axios from 'axios';

export const verifyUser = (code) => {
    return axios.get("/api/gftshoppe/auth/confirm/" + code).then((response) => {
        return response.data;
    });
};
