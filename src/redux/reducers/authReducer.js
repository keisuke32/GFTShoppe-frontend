import actions from '../actions/authActions';

const initialState = {
    isSigned: false,
    signedUser: null,
    token: null,
};

const authReducer = (state = initialState, actions) => {
    const { type, isSigned, email, id, token } = actions;

    switch (type) {
        case 'REGISTER':
            return {
                isSigned: isSigned
            }
        case 'LOGIN':
            return {
                isSigned: isSigned,
                signedUser: {
                    email: email,
                    id: id
                },
                token: token
            }
        case 'LOGOUT':
            return {
                isSigned: false,
                signedUser: null,
                token: null
            }
        default:
            return state
    }
};

export default authReducer;