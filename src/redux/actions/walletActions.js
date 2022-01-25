export const walletConnect = (data) => dispatch => {
    dispatch({
        type: 'CONNECT_WALLET',
        isConnected: data.isConnected,
        address: data.address,
        web3: data.web3,
    })
}

export const setAddress = (address) => dispatch => {
    dispatch({
        type: 'SET_ADDRESS',
        address: address,
    })
}

export const setIsConnected = (isConnected) => dispatch => {
    dispatch({
        type: 'SET_IS_CONNECTED',
        isConnected: isConnected,
    })
}

export const setWeb3 = (web3) => dispatch => {
    dispatch({
        type: 'SET_WEB3',
        web3: web3,
    })
}