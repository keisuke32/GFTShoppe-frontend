import axios from 'axios';

export const register = (data) => dispatch => {
    console.log("good")
    dispatch({
        type: 'REGISTER',
    })
}

export const login = (data) => dispatch => {
    dispatch({
        type: 'LOGIN',
        isSigned: data.isSigned,
        email: data.email,
        id: data.id,
        token: data.token
    })
}

export const logout = () => dispatch => {
    dispatch({
        type: 'LOGOUT',
    })
}