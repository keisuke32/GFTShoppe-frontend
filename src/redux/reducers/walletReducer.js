import actions from '../actions/authActions';

const initialState = {
    isConnected: false,
    web3: null,
    walletAddress: null,
};

const authReducer = (state = initialState, actions) => {
    const { type, isConnected, address, web3 } = actions;

    switch (type) {
        case 'CONNECT_WALLET':
            return {
                ...state,
                isConnected: isConnected,
                walletAddress: address,
                web3: web3,
            }
        case 'SET_ADDRESS':
            return {
                ...state,
                walletAddress: address,
            }
        case 'SET_IS_CONNECTED':
            return {
                ...state,
                isConnected: isConnected,
            }
        case 'SET_WEB3':
            return {
                ...state,
                web3: web3,
            }
        default:
            return state
    }
};

export default authReducer;